import { DashboardMetrics, StatCard } from "@/types/dashboard";
import { STAT_CARD_FACTORIES } from "./statCardFactories";

export function buildStatCards(
  metrics: DashboardMetrics,
  keys: readonly (keyof typeof STAT_CARD_FACTORIES)[]
): StatCard[] {
  return keys.map((key) => STAT_CARD_FACTORIES[key](metrics));
}
