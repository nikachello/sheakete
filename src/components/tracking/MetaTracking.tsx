"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { trackingSnapshot, subscribeTracking, setTrackingEnabled, getAttribution, trackMetaEvent } from "@/lib/meta/browser";
import { publicMetaEnabled } from "@/lib/meta/shared";

export function MetaTracking() {
  const pathname = usePathname();
  const tracking = useSyncExternalStore(subscribeTracking, trackingSnapshot, () => "unknown");
  const previousPath = useRef<string | null>(null);
  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      window.fbq?.("consent", "revoke");
      previousPath.current = null;
      return;
    }
    if (!publicMetaEnabled() || tracking !== "enabled") return;
    try {
      getAttribution();
      if (previousPath.current !== pathname) {
        previousPath.current = pathname;
        trackMetaEvent("PageView");
      }
    } catch { /* Browser privacy/storage restrictions must not break the page. */ }
  }, [pathname, tracking]);
  return null;
}

export function ProductViewTracking({ id, title, price }: { id: string; title: string; price: number }) {
  const pathname = usePathname();
  const tracking = useSyncExternalStore(subscribeTracking, trackingSnapshot, () => "unknown");
  const previousView = useRef<string | null>(null);
  useEffect(() => {
    if (!publicMetaEnabled() || tracking !== "enabled" || previousView.current === pathname) return;
    try {
      previousView.current = pathname;
      trackMetaEvent("ViewContent", { content_ids: [id], content_name: title, content_type: "product", value: price, currency: "GEL" });
    } catch { /* Tracking is optional to the product experience. */ }
  }, [tracking, pathname, id, title, price]);
  return null;
}

// A preference control on the privacy page, not a popup or an order prerequisite.
export function TrackingPreference() {
  const tracking = useSyncExternalStore(subscribeTracking, trackingSnapshot, () => "unknown");
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);
  if (!publicMetaEnabled()) return <p>ამ გარემოში Meta-ს სარეკლამო გაზომვა გამორთულია.</p>;
  const enabled = tracking !== "disabled";
  const change = async () => {
    setSaving(true);
    setFailed(false);
    try { await setTrackingEnabled(failed ? false : !enabled); }
    catch { setFailed(true); }
    finally { setSaving(false); }
  };
  return (
    <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <p aria-live="polite">რეკლამის გაზომვა ამ ბრაუზერში: {enabled ? "ჩართულია" : "გამორთულია"}.</p>
      <button type="button" disabled={saving || tracking === "unknown"} onClick={() => void change()} className="min-h-11 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-bold disabled:opacity-50">
        {saving ? "ინახება…" : failed ? "გამორთვის ხელახლა ცდა" : enabled ? "რეკლამის გაზომვის გამორთვა" : "რეკლამის გაზომვის ჩართვა"}
      </button>
      {failed && <p role="alert">ბრაუზერში გაზომვა შეჩერებულია, თუმცა სერვერთან დაკავშირება ვერ მოხერხდა. გთხოვთ, სცადოთ ხელახლა ან დაგვიკავშირდეთ.</p>}
    </div>
  );
}
