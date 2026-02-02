import { TrendData } from "@/types/dashboard";

export function calculateTrend(current: number, previous: number): TrendData {
  if (previous === 0) {
    return current === 0
      ? { value: "0%", type: "neutral", isPositive: false }
      : { value: "New", type: "up", isPositive: true };
  }

  const change = ((current - previous) / previous) * 100;
  const rounded = Math.round(change * 10) / 10;

  return {
    value: `${rounded > 0 ? "+" : ""}${rounded.toFixed(1)}%`,
    type: rounded > 0 ? "up" : rounded < 0 ? "down" : "neutral",
    isPositive: rounded > 0,
  };
}
