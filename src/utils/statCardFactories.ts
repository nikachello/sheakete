import { DashboardMetrics, StatCard } from "@/types/dashboard";
import { formatCurrency, formatNumber } from "./formatter";
import { STAT_CARD_CONFIG } from "@/lib/constants";

export const STAT_CARD_FACTORIES: Record<
  string,
  (metrics: DashboardMetrics) => StatCard
> = {
  pendingLeads: (m) => ({
    id: "pending-leads",
    title: STAT_CARD_CONFIG.PENDING_LEADS.title,
    value: formatNumber(m.pendingLeads),
    description: STAT_CARD_CONFIG.PENDING_LEADS.description,
    footerText: STAT_CARD_CONFIG.PENDING_LEADS.footerText,
    trend: null,
  }),

  pendingShipmentValue: (m) => ({
    id: "pending-shipment",
    title: STAT_CARD_CONFIG.PENDING_SHIPMENT.title,
    value: formatCurrency(m.pendingShipmentValue),
    description: STAT_CARD_CONFIG.PENDING_SHIPMENT.description,
    footerText: STAT_CARD_CONFIG.PENDING_SHIPMENT.footerText,
    trend: null,
  }),

  cashWithCourier: (m) => ({
    id: "cash-with-courier",
    title: STAT_CARD_CONFIG.CASH_WITH_COURIER.title,
    value: formatCurrency(m.cashWithCourier),
    description: STAT_CARD_CONFIG.CASH_WITH_COURIER.description,
    footerText: STAT_CARD_CONFIG.CASH_WITH_COURIER.footerText,
    trend: null,
  }),

  settledAmount: (m) => ({
    id: "settled-amount",
    title: STAT_CARD_CONFIG.SETTLED_AMOUNT.title,
    value: formatCurrency(m.settledAmount),
    description: STAT_CARD_CONFIG.SETTLED_AMOUNT.description,
    footerText: STAT_CARD_CONFIG.SETTLED_AMOUNT.footerText,
    trend: null,
  }),

  rtoLoss: (m) => ({
    id: "rto-loss",
    title: STAT_CARD_CONFIG.RTO_LOSS.title,
    value: formatCurrency(m.rtoLoss),
    description: STAT_CARD_CONFIG.RTO_LOSS.description,
    footerText: STAT_CARD_CONFIG.RTO_LOSS.footerText,
    trend:
      m.rtoLoss > 0
        ? { value: "Monitor", type: "down", isPositive: false }
        : null,
  }),

  monthlyRevenue: (m) => ({
    id: "monthly-revenue",
    title: STAT_CARD_CONFIG.MONTHLY_REVENUE.title,
    value: formatCurrency(m.monthlyRevenue.revenue),
    description: STAT_CARD_CONFIG.MONTHLY_REVENUE.description,
    footerText: STAT_CARD_CONFIG.MONTHLY_REVENUE.footerText,
    trend: null,
  }),

  monthlyProfit: (m) => ({
    id: "monthly-profit",
    title: "თვიური მოგება",
    value: formatCurrency(m.monthlyRevenue.profit),
    description: "შემოსავალი − ხარჯები",
    footerText: "წმინდა მოგება",
    trend: null,
  }),
};
