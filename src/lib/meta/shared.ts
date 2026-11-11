import { z } from "zod";

export const CONSENT_COOKIE = "sheakete_marketing_v1";
export const SESSION_COOKIE = "sheakete_marketing_session_v1";
export const ATTRIBUTION_KEY = "sheakete_attribution_v1";
export const CONSENT_EVENT = "sheakete:marketing-consent";

export const attributionSchema = z.object({
  consent: z.literal(true),
  consentSessionId: z.string().uuid(),
  capturedAt: z.string().datetime(),
  landingUrl: z.string().url().max(1000),
  referrer: z.string().max(1000).optional(),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  campaign_id: z.string().max(100).optional(),
  adset_id: z.string().max(100).optional(),
  ad_id: z.string().max(100).optional(),
  fbc: z.string().regex(/^fb\.\d+\.\d+\.[A-Za-z0-9_-]+$/).max(500).optional(),
  fbp: z.string().regex(/^fb\.\d+\.\d+\.\d+$/).max(200).optional(),
});

export type Attribution = z.infer<typeof attributionSchema>;

export function cleanUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return;
    // No query strings, credentials, or fragments containing customer information.
    return `${url.origin}${url.pathname}`.slice(0, 1000);
  } catch {
    return;
  }
}

export function publicMetaEnabled(): boolean {
  return process.env.NEXT_PUBLIC_META_ENABLED === "true" &&
    /^\d+$/.test(process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "");
}
