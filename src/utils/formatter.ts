import { DEFAULT_CURRENCY } from "@/lib/constants";
import { TrendData } from "@/types/dashboard";
import { OrderStatus } from "generated/prisma/enums";

/**
 * Format a number as currency with proper locale support
 * @param amount - The amount to format (can be null/undefined)
 * @param currency - Currency code (defaults to GEL)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number | null | undefined,
  currency: string = DEFAULT_CURRENCY
): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency} 0`;
  }

  // Use Georgian locale for proper number formatting
  const formatted = new Intl.NumberFormat("ka-GE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${currency} ${formatted}`;
}

/**
 * Format a number with proper locale support
 * @param num - The number to format (can be null/undefined)
 * @returns Formatted number string
 */
export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined || isNaN(num)) {
    return "0";
  }

  return new Intl.NumberFormat("ka-GE").format(num);
}

/**
 * Calculate trend between current and previous values
 * @param current - Current period value
 * @param previous - Previous period value
 * @returns Trend data object
 */
export function calculateTrend(current: number, previous: number): TrendData {
  // Handle edge cases
  if (previous === 0) {
    if (current === 0) {
      return { value: "0%", type: "neutral", isPositive: false };
    }
    return { value: "New", type: "up", isPositive: true };
  }

  const change = ((current - previous) / previous) * 100;
  const roundedChange = Math.round(change * 10) / 10; // Round to 1 decimal

  return {
    value: `${roundedChange > 0 ? "+" : ""}${roundedChange.toFixed(1)}%`,
    type: roundedChange > 0 ? "up" : roundedChange < 0 ? "down" : "neutral",
    isPositive: roundedChange > 0,
  };
}

/**
 * Format a date range for display
 * @param startDate - Start of the range
 * @param endDate - End of the range
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  const start = startDate.toLocaleDateString("ka-GE", options);
  const end = endDate.toLocaleDateString("ka-GE", options);

  return `${start} - ${end}`;
}

export function activityMessageFromOrder(order: {
  id: string;
  status: OrderStatus;
  actualPaidPrice: number | null;
  customerName: string;
  comboDetails: string | null;
  productTitle: string | null;
}) {
  switch (order.status) {
    case "DELIVERED":
      return `შეკვეთა ${order.customerName} - ${order.productTitle} - ${order.comboDetails} მიტანილია - ${order.actualPaidPrice ?? 0} ლარი`;
    case "RETURNED":
      return `შეკვეთა ${order.customerName} - ${order.productTitle} - ${order.comboDetails} დაბრუნდა`;
    case "SHIPPED":
      return `შეკვეთა ${order.customerName} - ${order.productTitle} - ${order.comboDetails} გაიგზავნა`;
    default:
      return `შეკვეთა ${order.customerName} - ${order.productTitle} - ${order.comboDetails} განახლდა`;
  }
}
