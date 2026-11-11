"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { consentSnapshot, subscribeConsent, setMarketingConsent, getAttribution, trackMetaEvent } from "@/lib/meta/browser";
import { publicMetaEnabled } from "@/lib/meta/shared";

export function MetaTracking() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeConsent, consentSnapshot, () => "unknown");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [saving, setSaving] = useState(false);
  const previousPath = useRef<string | null>(null);
  const enabled = publicMetaEnabled() && !pathname.startsWith("/admin");

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      window.fbq?.("consent", "revoke");
      previousPath.current = null;
      return;
    }
    if (!enabled || consent !== "granted") return;
    getAttribution();
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      trackMetaEvent("PageView");
    }
  }, [pathname, consent, enabled]);

  if (!enabled) return null;
  const showBanner = consent === "unknown" || settingsOpen;
  const choose = async (granted: boolean) => {
    setSaving(true);
    setConsentError(false);
    try { await setMarketingConsent(granted); setSettingsOpen(false); }
    catch { setConsentError(true); setSettingsOpen(true); }
    finally { setSaving(false); }
  };
  return (
    <>
      {showBanner ? (
        <section aria-label="რეკლამის პარამეტრები" lang="ka" className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white p-4 text-sm text-zinc-900 shadow-lg">
          <div className="mx-auto max-w-md space-y-3">
            <p>თქვენი თანხმობით ვიყენებთ Meta-ს ტექნოლოგიებს რეკლამის შედეგების გასაზომად. უარის შემთხვევაში შეკვეთას ჩვეულებრივ გააგზავნით.</p>
            <Link href="/privacy" className="inline-block underline">კონფიდენციალურობა</Link>
            {consentError && <p role="alert">პარამეტრები ვერ შეინახა. გთხოვთ, სცადოთ ხელახლა.</p>}
            <div className="flex gap-3">
              <button type="button" disabled={saving} className="flex-1 rounded-lg border px-4 py-3" onClick={() => void choose(false)}>უარი</button>
              <button type="button" disabled={saving} className="flex-1 rounded-lg bg-zinc-900 px-4 py-3 text-white" onClick={() => void choose(true)}>ვეთანხმები</button>
            </div>
          </div>
        </section>
      ) : (
        <div className="bg-white px-4 py-3 text-center text-xs text-zinc-500">
          <button type="button" className="underline" onClick={() => setSettingsOpen(true)}>რეკლამის პარამეტრები</button>
        </div>
      )}
    </>
  );
}

export function ProductViewTracking({ id, title, price }: { id: string; title: string; price: number }) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeConsent, consentSnapshot, () => "unknown");
  const previousView = useRef<string | null>(null);
  useEffect(() => {
    if (consent !== "granted" || previousView.current === pathname) return;
    previousView.current = pathname;
    trackMetaEvent("ViewContent", { content_ids: [id], content_name: title, content_type: "product", value: price, currency: "GEL" });
  }, [consent, pathname, id, title, price]);
  return null;
}
