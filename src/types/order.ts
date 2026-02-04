import {
  Order,
  OrderStatus,
  PaymentStatus,
  Remittance,
} from "prisma/generated/prisma/client";

export interface OrderActivity {
  customerName: string;
  productTitle: string | null;
  comboDetails: string | null;
  actualPaidPrice?: number | null;
}

/**
 * Orders dashboard statistics
 */
export interface OrdersStats {
  readyToShip: {
    count: number;
    value: number;
    label: string;
  };
  inTransit: {
    count: number;
    label: string;
  };
  awaitingPayment: {
    amount: number;
    count: number;
    label: string;
  };
  deliveryRate: {
    percentage: number;
    delivered: number;
    total: number;
    trend: number;
    label: string;
  };
  weeklyReturns: {
    count: number;
    rtoLoss: number;
    returnRate: number;
    label: string;
  };
}

/**
 * Order with remittance relation
 */
export interface OrderWithRemittance extends Order {
  remittance?: {
    id: string;
    bankReference: string | null;
  } | null;
}

/**
 * Orders list result with pagination
 */
export interface OrdersListResult {
  orders: OrderWithRemittance[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

/**
 * Order filters
 */
export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  city?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Order stat card for UI
 */
export interface OrderStatCard {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  description: string;
  footerText: string;
  trend: {
    value: string;
    type: "up" | "down" | "neutral";
    isPositive: boolean;
  } | null;
  icon?: string;
}

/**
 * Bulk operation result
 */
export interface BulkOperationResult {
  success: boolean;
  count?: number;
  error?: string;
}

/**
 * Remittance creation result
 */
export interface RemittanceCreationResult {
  success: boolean;
  remittance?: Remittance;
  orderCount?: number;
  error?: string;
}
