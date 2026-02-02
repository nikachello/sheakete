import { STAT_CARD_CONFIG } from "@/lib/constants";
import {
  DashboardMetrics,
  RawDashboardData,
  StatCard,
} from "@/types/dashboard";
import { OrderStatus, PaymentStatus } from "generated/prisma/enums";
import { formatCurrency, formatNumber, calculateTrend } from "./formatter";

/**
 * Extract business metrics from raw database results
 * This is the key transformation layer that converts database aggregations
 * into meaningful business metrics
 *
 * @param data - Raw aggregated data from database
 * @returns Processed business metrics
 */
export function extractMetrics(data: RawDashboardData): DashboardMetrics {
  const { statusGroups, paymentGroups, currentMonth } = data;

  // Extract pending leads count (orders with PENDING status)
  const pendingLeads =
    statusGroups.find((g) => g.status === OrderStatus.PENDING)?._count.id ?? 0;

  // Extract total value of confirmed orders ready for shipment
  const pendingShipmentValue =
    statusGroups.find((g) => g.status === OrderStatus.CONFIRMED)?._sum
      .expectedPrice ?? 0;

  // Extract cash collected by couriers but not yet deposited
  const cashWithCourier =
    paymentGroups.find((g) => g.paymentStatus === PaymentStatus.COLLECTED)?._sum
      .actualPaidPrice ?? 0;

  // Extract total amount settled in bank
  const settledAmount =
    paymentGroups.find((g) => g.paymentStatus === PaymentStatus.SETTLED)?._sum
      .actualPaidPrice ?? 0;

  // Calculate RTO (Return to Origin) losses from shipping fees
  const rtoLoss =
    statusGroups.find((g) => g.status === OrderStatus.RETURNED)?._sum
      .additionalCosts ?? 0;

  return {
    pendingLeads,
    pendingShipmentValue,
    cashWithCourier,
    settledAmount,
    rtoLoss,
    monthlyRevenue: currentMonth,
  };
}

/**
 * Transform business metrics into display-ready stat cards
 * This layer adds formatting, labels, and presentation logic
 *
 * @param metrics - Processed business metrics
 * @returns Array of stat cards ready for UI rendering
 */
export function metricsToStatCards(metrics: DashboardMetrics): StatCard[] {
  return [
    {
      id: "pending-leads",
      title: STAT_CARD_CONFIG.PENDING_LEADS.title,
      value: formatNumber(metrics.pendingLeads),
      description: STAT_CARD_CONFIG.PENDING_LEADS.description,
      footerText: STAT_CARD_CONFIG.PENDING_LEADS.footerText,
      trend: null, // TODO: Add trend calculation when historical data is available
    },
    {
      id: "pending-shipment",
      title: STAT_CARD_CONFIG.PENDING_SHIPMENT.title,
      value: formatCurrency(metrics.pendingShipmentValue),
      description: STAT_CARD_CONFIG.PENDING_SHIPMENT.description,
      footerText: STAT_CARD_CONFIG.PENDING_SHIPMENT.footerText,
      trend: null,
    },
    {
      id: "cash-with-courier",
      title: STAT_CARD_CONFIG.CASH_WITH_COURIER.title,
      value: formatCurrency(metrics.cashWithCourier),
      description: STAT_CARD_CONFIG.CASH_WITH_COURIER.description,
      footerText: STAT_CARD_CONFIG.CASH_WITH_COURIER.footerText,
      trend: null,
    },
    {
      id: "settled-amount",
      title: STAT_CARD_CONFIG.SETTLED_AMOUNT.title,
      value: formatCurrency(metrics.settledAmount),
      description: STAT_CARD_CONFIG.SETTLED_AMOUNT.description,
      footerText: STAT_CARD_CONFIG.SETTLED_AMOUNT.footerText,
      trend: null,
    },
    {
      id: "rto-loss",
      title: STAT_CARD_CONFIG.RTO_LOSS.title,
      value: formatCurrency(metrics.rtoLoss),
      description: STAT_CARD_CONFIG.RTO_LOSS.description,
      footerText: STAT_CARD_CONFIG.RTO_LOSS.footerText,
      trend:
        metrics.rtoLoss > 0
          ? {
              value: "Monitor",
              type: "down",
              isPositive: false,
            }
          : null,
    },
  ];
}

/**
 * Alternative: Transform metrics with historical comparison
 * Use this when you have previous period data for trend calculation
 *
 * @param current - Current period metrics
 * @param previous - Previous period metrics
 * @returns Array of stat cards with trend data
 */
export function metricsToStatCardsWithTrends(
  current: DashboardMetrics,
  previous: DashboardMetrics
): StatCard[] {
  // No need for require() - calculateTrend is already imported at the top!

  return [
    {
      id: "pending-leads",
      title: STAT_CARD_CONFIG.PENDING_LEADS.title,
      value: formatNumber(current.pendingLeads),
      description: STAT_CARD_CONFIG.PENDING_LEADS.description,
      footerText: STAT_CARD_CONFIG.PENDING_LEADS.footerText,
      trend: calculateTrend(current.pendingLeads, previous.pendingLeads),
    },
    {
      id: "pending-shipment",
      title: STAT_CARD_CONFIG.PENDING_SHIPMENT.title,
      value: formatCurrency(current.pendingShipmentValue),
      description: STAT_CARD_CONFIG.PENDING_SHIPMENT.description,
      footerText: STAT_CARD_CONFIG.PENDING_SHIPMENT.footerText,
      trend: calculateTrend(
        current.pendingShipmentValue,
        previous.pendingShipmentValue
      ),
    },
    {
      id: "cash-with-courier",
      title: STAT_CARD_CONFIG.CASH_WITH_COURIER.title,
      value: formatCurrency(current.cashWithCourier),
      description: STAT_CARD_CONFIG.CASH_WITH_COURIER.description,
      footerText: STAT_CARD_CONFIG.CASH_WITH_COURIER.footerText,
      trend: calculateTrend(current.cashWithCourier, previous.cashWithCourier),
    },
    {
      id: "settled-amount",
      title: STAT_CARD_CONFIG.SETTLED_AMOUNT.title,
      value: formatCurrency(current.settledAmount),
      description: STAT_CARD_CONFIG.SETTLED_AMOUNT.description,
      footerText: STAT_CARD_CONFIG.SETTLED_AMOUNT.footerText,
      trend: calculateTrend(current.settledAmount, previous.settledAmount),
    },
    {
      id: "rto-loss",
      title: STAT_CARD_CONFIG.RTO_LOSS.title,
      value: formatCurrency(current.rtoLoss),
      description: STAT_CARD_CONFIG.RTO_LOSS.description,
      footerText: STAT_CARD_CONFIG.RTO_LOSS.footerText,
      trend: calculateTrend(current.rtoLoss, previous.rtoLoss),
    },
  ];
}

export function mapOrderToAttentionRow(order: {
  id: string;
  status: OrderStatus;
  updatedAt: Date;
  actualPaidPrice: number | null;
}) {
  return {
    id: order.id,
    status: order.status,
    amount: order.actualPaidPrice ?? 0,
    ageHours: Math.floor((Date.now() - order.updatedAt.getTime()) / 36e5),
  };
}
