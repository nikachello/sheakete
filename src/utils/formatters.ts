import { DEFAULT_CURRENCY } from "@/constants/dashboard";

const GEORGIAN_LOCALE = "ka-GE";

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
