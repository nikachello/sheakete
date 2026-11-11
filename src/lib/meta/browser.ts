"use client";

import {
  ATTRIBUTION_KEY, CONSENT_COOKIE, CONSENT_EVENT, SESSION_COOKIE,
  attributionSchema, cleanUrl, publicMetaEnabled, type Attribution,
} from "./shared";
import { withdrawMarketingConsent } from "@/actions/public/tracking-actions";

type Pixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: Pixel;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Pixel;
    _fbq?: Pixel;
    sheaketePixelInitialized?: boolean;
    sheaketeEvents?: Set<string>;
  }
}

export function readCookie(name: string): string | undefined {
  return document.cookie.split("; ").find((item) => item.startsWith(`${name}=`))?.slice(name.length + 1);
}

function writeCookie(name: string, value: string, maxAge = 60 * 60 * 24 * 90) {
  document.cookie = `${name}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
}

export function consentSnapshot() {
  return readCookie(CONSENT_COOKIE) ?? "unknown";
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export async function setMarketingConsent(granted: boolean) {
  writeCookie(CONSENT_COOKIE, granted ? "granted" : "denied");
  if (!granted) {
    window.fbq?.("consent", "revoke");
    try { sessionStorage.removeItem(ATTRIBUTION_KEY); } catch { /* Storage may be unavailable. */ }
    writeCookie("_fbc", "", 0);
    writeCookie("_fbp", "", 0);
    // Suppress pending server events too. Already-sent events cannot be unsent here.
    await withdrawMarketingConsent();
    location.reload();
    return;
  }
  if (!readCookie(SESSION_COOKIE)) writeCookie(SESSION_COOKIE, crypto.randomUUID());
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function getAttribution(): Attribution | undefined {
  if (!publicMetaEnabled() || consentSnapshot() !== "granted") return;
  if (!readCookie(SESSION_COOKIE)) writeCookie(SESSION_COOKIE, crypto.randomUUID());
  const url = new URL(location.href);
  const fbclid = url.searchParams.get("fbclid");
  if (fbclid && /^[A-Za-z0-9_-]{1,400}$/.test(fbclid)) {
    const current = readCookie("_fbc");
    if (!current?.endsWith(`.${fbclid}`)) writeCookie("_fbc", `fb.1.${Date.now()}.${fbclid}`);
  }
  let previous: unknown;
  try { previous = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) ?? "null"); } catch { /* No attribution yet. */ }
  const parsed = attributionSchema.safeParse(previous);
  const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "campaign_id", "adset_id", "ad_id"] as const;
  const hasCampaign = campaignKeys.some((key) => url.searchParams.has(key));
  const base = parsed.success && !hasCampaign && parsed.data.consentSessionId === readCookie(SESSION_COOKIE) ? parsed.data : {
    consent: true as const,
    consentSessionId: readCookie(SESSION_COOKIE),
    capturedAt: new Date().toISOString(),
    landingUrl: cleanUrl(location.href)!,
    referrer: cleanUrl(document.referrer),
    ...Object.fromEntries(campaignKeys.map((key) => [key, url.searchParams.get(key)?.slice(0, 200) || undefined])),
  };
  const result = attributionSchema.safeParse({ ...base, fbc: readCookie("_fbc"), fbp: readCookie("_fbp") });
  if (!result.success) return;
  try { sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(result.data)); } catch { /* Storage may be unavailable. */ }
  return result.data;
}

function initializePixel(): Pixel | undefined {
  if (!publicMetaEnabled() || consentSnapshot() !== "granted" || location.pathname.startsWith("/admin")) return;
  if (!window.fbq) {
    const pixel = function (...args: unknown[]) {
      if (pixel.callMethod) pixel.callMethod(...args);
      else pixel.queue.push(args);
    } as Pixel;
    pixel.queue = [];
    pixel.push = pixel;
    pixel.loaded = true;
    pixel.version = "2.0";
    window.fbq = pixel;
    window._fbq = pixel;
  }
  if (!window.sheaketePixelInitialized) {
    window.sheaketePixelInitialized = true;
    window.fbq("consent", "grant");
    // Disable automatic form/button events; explicit application events are authoritative.
    window.fbq("set", "autoConfig", false, process.env.NEXT_PUBLIC_META_PIXEL_ID);
    window.fbq("init", process.env.NEXT_PUBLIC_META_PIXEL_ID);
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  window.fbq("consent", "grant");
  return window.fbq;
}

export function trackMetaEvent(name: "PageView" | "ViewContent" | "Lead", data: Record<string, unknown> = {}, eventId = crypto.randomUUID()) {
  const pixel = initializePixel();
  if (!pixel) return;
  window.sheaketeEvents ??= new Set();
  if (window.sheaketeEvents.has(eventId)) return;
  window.sheaketeEvents.add(eventId);
  pixel("track", name, data, { eventID: eventId });
}
