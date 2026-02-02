import { OrderStatus } from "generated/prisma/enums";
import { PaymentStatus } from "generated/prisma/enums";
import { STAT_CARD_CONFIG } from "@/constants/dashboard";
import { calculateTrend } from "@/utils/dashboard/stats";
import {
  DashboardMetrics,
  RawDashboardData,
  StatCard,
} from "@/types/dashboard";
import { formatCurrency, formatNumber } from "../formatters";

export function mapOrderToActivityMessage(
  status: OrderStatus,
  order: OrderActivity
) {
  const info = `${order.customerName} - ${order.productTitle} - ${order.comboDetails}`;

  const messages: Record<string, string> = {
    DELIVERED: `შეკვეთა ${info} მიტანილია - ${order.actualPaidPrice ?? 0} ლარი`,
    RETURNED: `შეკვეთა ${info} დაბრუნდა`,
    SHIPPED: `შეკვეთა ${info} გაიგზავნა`,
  };

  return messages[status] ?? `შეკვეთა ${info} განახლდა`;
}

/**
 * Transforms Raw DB Data into Business Metrics
 */
export function extractMetrics(data: RawDashboardData): DashboardMetrics {
  const { statusGroups, paymentGroups, currentMonth } = data;

  const findStatus = (s: OrderStatus) =>
    statusGroups.find((g) => g.status === s);
  const findPayment = (p: PaymentStatus) =>
    paymentGroups.find((g) => g.paymentStatus === p);

  return {
    pendingLeads: findStatus(OrderStatus.PENDING)?._count.id ?? 0,
    pendingShipmentValue:
      findStatus(OrderStatus.CONFIRMED)?._sum.expectedPrice ?? 0,
    cashWithCourier:
      findPayment(PaymentStatus.COLLECTED)?._sum.actualPaidPrice ?? 0,
    settledAmount:
      findPayment(PaymentStatus.SETTLED)?._sum.actualPaidPrice ?? 0,
    rtoLoss: findStatus(OrderStatus.RETURNED)?._sum.additionalCosts ?? 0,
    monthlyRevenue: currentMonth,
  };
}

export function metricsToStatCards(
  current: DashboardMetrics,
  previous?: DashboardMetrics // Optional: if provided, trends are calculated
): StatCard[] {
  // Helper to build a card to avoid 100 lines of repetitive code
  const createCard = (
    id: string,
    config: (typeof STAT_CARD_CONFIG)[keyof typeof STAT_CARD_CONFIG],
    value: number,
    isCurrency = true
  ): StatCard => ({
    id,
    title: config.title,
    value: isCurrency ? formatCurrency(value) : formatNumber(value),
    description: config.description,
    footerText: config.footerText,
    trend: previous
      ? calculateTrend(
          value,
          (previous as any)[
            id === "pending-leads" ? "pendingLeads" : id.replace(/-/g, "")
          ] || 0
        )
      : null,
  });

  return [
    createCard(
      "pending-leads",
      STAT_CARD_CONFIG.PENDING_LEADS,
      current.pendingLeads,
      false
    ),
    createCard(
      "pending-shipment",
      STAT_CARD_CONFIG.PENDING_SHIPMENT,
      current.pendingShipmentValue
    ),
    createCard(
      "cash-with-courier",
      STAT_CARD_CONFIG.CASH_WITH_COURIER,
      current.cashWithCourier
    ),
    createCard(
      "settled-amount",
      STAT_CARD_CONFIG.SETTLED_AMOUNT,
      current.settledAmount
    ),
    createCard("rto-loss", STAT_CARD_CONFIG.RTO_LOSS, current.rtoLoss),
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
    ageHours: Math.floor(
      (Date.now() - new Date(order.updatedAt).getTime()) / 36e5
    ),
  };
}

/**
 * Transform business metrics into display-ready stat cards
 * This layer adds formatting, labels, and presentation logic
 *
 * @param metrics - Processed business metrics
 * @returns Array of stat cards ready for UI rendering
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
