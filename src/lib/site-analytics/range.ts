export type AnalyticsRange = "today" | "7" | "30";
export const rangeLabels: Record<AnalyticsRange, string> = { today: "Today", "7": "Last 7 days", "30": "Last 30 days" };

export function tbilisiDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tbilisi", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

export function reportRange(value: string | undefined, now = new Date()) {
  const range: AnalyticsRange = value === "today" || value === "7" || value === "30" ? value : "7";
  const days = range === "today" ? 1 : Number(range);
  const midnight = new Date(`${tbilisiDate(now)}T00:00:00+04:00`);
  return { range, days, start: new Date(midnight.getTime() - (days - 1) * 86400_000), end: now };
}

export function conversionRate(convertedSessions: number, sessions: number) {
  return sessions > 0 ? (convertedSessions / sessions) * 100 : 0;
}
