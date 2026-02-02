import { OrderStatus, PaymentStatus } from "generated/prisma/enums";

/**
 * Represents a single stat card to be displayed on the dashboard
 */
export interface StatCard {
  id: string;
  title: string;
  value: string;
  description: string;
  footerText: string;
  trend: {
    value: string;
    type: "up" | "down" | "neutral";
    isPositive: boolean;
  } | null;
}

/**
 * Processed metrics ready for business logic
 */
export interface DashboardMetrics {
  pendingLeads: number;
  pendingShipmentValue: number;
  cashWithCourier: number;
  settledAmount: number;
  rtoLoss: number;
  monthlyRevenue: {
    revenue: number;
    costs: number;
    profit: number;
    margin: number;
    orderCount: number;
  };
}

/**
 * Raw database aggregation result for order status grouping
 */
export interface OrderStatusGroup {
  status: OrderStatus;
  _sum: {
    expectedPrice: number | null;
    additionalCosts: number | null;
  };
  _count: {
    id: number;
  };
}

/**
 * Raw database aggregation result for payment status grouping
 */
export interface PaymentStatusGroup {
  paymentStatus: PaymentStatus;
  _sum: {
    expectedPrice: number | null;
    actualPaidPrice: number | null;
  };
  _count: {
    id: number;
  };
}

/**
 * Raw data returned from database queries
 */
export interface RawDashboardData {
  statusGroups: OrderStatusGroup[];
  paymentGroups: PaymentStatusGroup[];
  currentMonth: {
    revenue: number;
    costs: number;
    profit: number;
    margin: number;
    orderCount: number;
  };
}

/**
 * Trend calculation result
 */
export interface TrendData {
  value: string;
  type: "up" | "down" | "neutral";
  isPositive: boolean;
}
