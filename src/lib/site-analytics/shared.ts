export const ANALYTICS_COOKIE = "sheakete_site_analytics_v1";
export const ANALYTICS_RETENTION_DAYS = 90;
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

export function siteAnalyticsEnabled() {
  if (process.env.NEXT_PUBLIC_SITE_ANALYTICS_ENABLED === "false") return false;
  return process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_SITE_ANALYTICS_ENABLED === "true";
}
