"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { subscribeTracking, trackingSnapshot } from "@/lib/meta/browser";
import { siteAnalyticsEnabled } from "@/lib/site-analytics/shared";

// Serialize navigation requests so the first response sets the signed visitor cookie
// before another page view is submitted. No polling or live dashboard connection.
let pending: Promise<unknown> = Promise.resolve();

export function SiteAnalytics() {
  const path = usePathname();
  const preference = useSyncExternalStore(subscribeTracking, trackingSnapshot, () => "unknown");
  const previousPath = useRef<string | null>(null);
  useEffect(() => {
    if (!siteAnalyticsEnabled() || preference !== "enabled" || path.startsWith("/admin") || previousPath.current === path) return;
    previousPath.current = path;
    const url = new URL(location.href);
    const body = JSON.stringify({
      id: crypto.randomUUID(), path,
      source: url.searchParams.get("utm_source")?.slice(0, 100),
      campaign: url.searchParams.get("utm_campaign")?.slice(0, 128),
      referrer: document.referrer.slice(0, 1000), metaClick: url.searchParams.has("fbclid"),
    });
    pending = pending.catch(() => undefined).then(async () => {
      if (trackingSnapshot() !== "enabled") return;
      try { await fetch("/api/analytics/pageview", { method: "POST", headers: { "Content-Type": "application/json" }, body, credentials: "same-origin", keepalive: true }); }
      catch { /* Analytics failure cannot interrupt browsing or ordering. */ }
    });
  }, [path, preference]);
  return null;
}
