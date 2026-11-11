import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { ANALYTICS_RETENTION_DAYS, SESSION_TIMEOUT_MS } from "./shared";

const identitySchema = z.object({
  visitorId: z.string().uuid(), sessionId: z.string().uuid(),
  firstSeen: z.number().int().positive(), lastSeen: z.number().int().positive(),
  source: z.string().min(1).max(100), campaign: z.string().max(128).optional(),
});
export type AnalyticsIdentity = z.infer<typeof identitySchema>;

export function serverSiteAnalyticsEnabled() {
  if (process.env.SITE_ANALYTICS_ENABLED === "false" || process.env.NEXT_PUBLIC_SITE_ANALYTICS_ENABLED === "false") return false;
  const production = process.env.NODE_ENV === "production" && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");
  return production || process.env.NEXT_PUBLIC_SITE_ANALYTICS_ENABLED === "true";
}

export function analyticsSigningKey() {
  const secret = process.env.SITE_ANALYTICS_SECRET || process.env.CRON_SECRET;
  // Domain-separated key: the analytics cookie never reveals the scheduler secret.
  return secret ? createHmac("sha256", secret).update("sheakete:site-analytics:v1").digest("hex") : null;
}

export function signIdentity(identity: AnalyticsIdentity, key: string) {
  const payload = Buffer.from(JSON.stringify(identity)).toString("base64url");
  return `${payload}.${createHmac("sha256", key).update(payload).digest("base64url")}`;
}

export function readIdentity(value: string | undefined, key: string | null, now = Date.now()): AnalyticsIdentity | null {
  if (!key || !value || value.length > 2000) return null;
  try {
    const [payload, signature, extra] = value.split(".");
    if (!payload || !signature || extra) return null;
    const expected = Buffer.from(createHmac("sha256", key).update(payload).digest("base64url"));
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
    const parsed = identitySchema.parse(JSON.parse(Buffer.from(payload, "base64url").toString("utf8")));
    if (parsed.lastSeen > now + 60_000 || parsed.firstSeen > parsed.lastSeen || now - parsed.lastSeen > ANALYTICS_RETENTION_DAYS * 86400_000) return null;
    return parsed;
  } catch { return null; }
}

export function resolveIdentity(previous: AnalyticsIdentity | null, source: string, campaign: string | undefined, now = Date.now()): AnalyticsIdentity {
  const newSession = !previous || now - previous.lastSeen >= SESSION_TIMEOUT_MS;
  return {
    visitorId: previous?.visitorId ?? randomUUID(),
    sessionId: newSession ? randomUUID() : previous.sessionId,
    firstSeen: previous?.firstSeen ?? now, lastSeen: now,
    source: newSession ? source : previous.source,
    ...(newSession ? (campaign ? { campaign } : {}) : (previous.campaign ? { campaign: previous.campaign } : {})),
  };
}

export function publicPath(value: string): string | null {
  if (value.length > 500 || !value.startsWith("/") || value.startsWith("//") || /[?#\\\x00-\x1f]/.test(value)) return null;
  let path: string;
  try { path = decodeURIComponent(value); } catch { return null; }
  if (/^\/(admin|api|_next)(\/|$)/i.test(path) || /[?#\\\x00-\x1f]/.test(path)) return null;
  // Only actual public store routes; arbitrary paths/URLs are never retained.
  return /^\/$|^\/(privacy|terms|shipping|returns|contact)\/?$|^\/product\/[^/]+\/?$/.test(path) ? value : null;
}

export function trafficSource(utmSource: string | undefined, referrer: string | undefined, ownOrigin: string, hasMetaClick: boolean) {
  if (utmSource && /^[A-Za-z0-9_.-]{1,80}$/.test(utmSource)) return utmSource.toLowerCase();
  if (hasMetaClick) return "meta";
  if (referrer) {
    try {
      const url = new URL(referrer);
      if (["http:", "https:"].includes(url.protocol) && url.origin !== ownOrigin) return url.hostname.toLowerCase().slice(0, 100);
    } catch { /* Invalid referrer means direct/unknown. */ }
  }
  return "direct";
}

export function knownBot(userAgent: string) {
  return /bot\b|crawler|spider|headless|lighthouse|facebookexternalhit|meta-external|googleother|bingpreview/i.test(userAgent);
}
