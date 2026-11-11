import { z } from "zod";

// Retain the existing preference cookie so previous opt-outs remain effective.
export const TRACKING_PREFERENCE_COOKIE = "sheakete_marketing_v1";
export const SESSION_COOKIE = "sheakete_marketing_session_v1";
export const ATTRIBUTION_KEY = "sheakete_attribution_v1";
export const TRACKING_EVENT = "sheakete:tracking-preference";

const attributionDetails = z.object({
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

export const attributionSchema = z.union([
  attributionDetails.extend({ trackingMode: z.enum(["automatic", "opt_in"]), sessionId: z.string().uuid() }),
  // Existing leads keep working without rewriting historical consent records.
  attributionDetails.extend({ consent: z.literal(true), consentSessionId: z.string().uuid() })
    .transform((legacy) => ({
      ...attributionDetails.parse(legacy), trackingMode: "opt_in" as const, sessionId: legacy.consentSessionId,
    })),
]);

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
