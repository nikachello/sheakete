import { DEFAULT_CURRENCY } from "@/constants/dashboard";

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

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "ახლავე";
  if (diffInMinutes < 60) return `${diffInMinutes} წუთის წინ`;
  if (diffInHours < 24) return `${diffInHours} საათის წინ`;
  if (diffInDays === 1) return "გუშინ";
  if (diffInDays < 7) return `${diffInDays} დღის წინ`;

  return new Date(date).toLocaleDateString("ka-GE");
}

export function getTodayTrendText(trend: number): string {
  if (trend > 20) return "ძალიან კარგი დინამიკა!";
  if (trend > 0) return "დადებითი დინამიკა";
  if (trend === 0) return "იგივე, რაც გუშინ";
  if (trend > -20) return "ოდნავ დაბალია";
  return "საყურადღებოა!";
}

export function formatTrendValue(trend: number): string {
  if (trend === 0) return "0%";
  const sign = trend > 0 ? "+" : "";
  return `${sign}${trend.toFixed(1)}%`;
}
