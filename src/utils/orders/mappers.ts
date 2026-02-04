import { OrdersStats, OrderStatCard } from "@/types/order";
import { formatCurrency, formatNumber } from "../formatters";

/**
 * Transform orders stats into display-ready stat cards
 */
export function ordersStatsToCards(stats: OrdersStats): OrderStatCard[] {
  return [
    // Card 1: Ready to Ship
    {
      id: "ready-to-ship",
      title: stats.readyToShip.label,
      value: formatNumber(stats.readyToShip.count),
      subtitle: formatCurrency(stats.readyToShip.value),
      description: "დადასტურებული შეკვეთები",
      footerText: "ჯამური ღირებულება",
      trend: null,
    },

    // Card 2: In Transit
    {
      id: "in-transit",
      title: stats.inTransit.label,
      value: formatNumber(stats.inTransit.count),
      description: "საკურიეროსთან არსებული შეკვეთები",
      footerText: "გზაში მყოფი პაკეტები",
      trend: null,
    },

    // Card 3: Awaiting Payment
    {
      id: "awaiting-payment",
      title: stats.awaitingPayment.label,
      value: formatCurrency(stats.awaitingPayment.amount),
      subtitle: `${stats.awaitingPayment.count} შეკვეთა`,
      description: "თანხა საკურიეროსთან",
      footerText: "საჭიროებს ჩარიცხვას",
      trend: null,
    },

    // Card 4: Delivery Rate
    {
      id: "delivery-rate",
      title: stats.deliveryRate.label,
      value: `${stats.deliveryRate.percentage.toFixed(1)}%`,
      subtitle: `${stats.deliveryRate.delivered} / ${stats.deliveryRate.total}`,
      description: "წარმატებით მიწოდებული",
      footerText: getDeliveryRateTrendText(stats.deliveryRate.trend),
      trend: {
        value: formatTrendValue(stats.deliveryRate.trend),
        type:
          stats.deliveryRate.trend > 0
            ? "up"
            : stats.deliveryRate.trend < 0
              ? "down"
              : "neutral",
        isPositive: stats.deliveryRate.trend >= 0,
      },
    },

    // Card 5: Weekly Returns
    {
      id: "weekly-returns",
      title: stats.weeklyReturns.label,
      value: formatNumber(stats.weeklyReturns.count),
      subtitle: formatCurrency(stats.weeklyReturns.rtoLoss) + " ზარალი",
      description: "დაბრუნებული შეკვეთები",
      footerText: `${stats.weeklyReturns.returnRate.toFixed(1)}% დაბრუნების მაჩვენებელი`,
      trend:
        stats.weeklyReturns.count > 0
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
 * Format trend value for display
 */
function formatTrendValue(trend: number): string {
  if (trend === 0) return "0%";
  const sign = trend > 0 ? "+" : "";
  return `${sign}${trend.toFixed(1)}%`;
}

/**
 * Get descriptive text for delivery rate trend
 */
function getDeliveryRateTrendText(trend: number): string {
  if (trend > 5) return "შესანიშნავი დინამიკა!";
  if (trend > 0) return "უმჯობესდება";
  if (trend === 0) return "სტაბილური";
  if (trend > -5) return "ოდნავ დაბალია";
  return "საყურადღებოა";
}

/**
 * Get status badge color and label
 */
export function getOrderStatusBadge(status: string): {
  bg: string;
  text: string;
  label: string;
  icon: string;
} {
  const statusMap: Record<
    string,
    { bg: string; text: string; label: string; icon: string }
  > = {
    CONFIRMED: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      label: "გასაგზავნი",
      icon: "📦",
    },
    SHIPPED: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      label: "გზაში",
      icon: "🚚",
    },
    DELIVERED: {
      bg: "bg-green-50",
      text: "text-green-700",
      label: "მიწოდებული",
      icon: "✅",
    },
    RETURNED: {
      bg: "bg-red-50",
      text: "text-red-700",
      label: "დაბრუნებული",
      icon: "↩️",
    },
  };

  return (
    statusMap[status] || {
      bg: "bg-gray-50",
      text: "text-gray-700",
      label: status,
      icon: "❓",
    }
  );
}

/**
 * Get payment status badge color and label
 */
export function getPaymentStatusBadge(status: string): {
  bg: string;
  text: string;
  label: string;
  icon: string;
} {
  const statusMap: Record<
    string,
    { bg: string; text: string; label: string; icon: string }
  > = {
    AWAITING_COLLECTION: {
      bg: "bg-gray-50",
      text: "text-gray-700",
      label: "ასაღები",
      icon: "⏳",
    },
    COLLECTED: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      label: "აღებული",
      icon: "💰",
    },
    SETTLED: {
      bg: "bg-green-50",
      text: "text-green-700",
      label: "ჩარიცხული",
      icon: "✅",
    },
    REFUNDED: {
      bg: "bg-red-50",
      text: "text-red-700",
      label: "დაბრუნებული",
      icon: "↩️",
    },
  };

  return (
    statusMap[status] || {
      bg: "bg-gray-50",
      text: "text-gray-700",
      label: status,
      icon: "❓",
    }
  );
}

/**
 * Calculate order profit
 */
export function calculateOrderProfit(order: {
  actualPaidPrice: number | null;
  productCost: number;
  shippingFee: number;
  additionalCosts: number;
}): {
  profit: number;
  margin: number;
} {
  const revenue = order.actualPaidPrice || 0;
  const costs = order.productCost + order.shippingFee + order.additionalCosts;
  const profit = revenue - costs;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

  return { profit, margin };
}

/**
 * Get urgency indicator for orders
 */
export function getOrderUrgency(
  status: string,
  createdAt: Date
): {
  level: "high" | "medium" | "low";
  label: string;
  color: string;
} {
  const now = new Date();
  const ageInHours =
    (now.getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60);

  if (status === "CONFIRMED") {
    if (ageInHours > 24) {
      return { level: "high", label: "გვიანდება!", color: "text-red-600" };
    } else if (ageInHours > 6) {
      return { level: "medium", label: "დროზე", color: "text-orange-600" };
    } else {
      return { level: "low", label: "ახალი", color: "text-green-600" };
    }
  }

  if (status === "SHIPPED") {
    if (ageInHours > 48) {
      return {
        level: "high",
        label: "დიდი ხანია გზაში",
        color: "text-red-600",
      };
    } else {
      return { level: "low", label: "გზაში", color: "text-blue-600" };
    }
  }

  return { level: "low", label: "-", color: "text-gray-600" };
}

/**
 * Format time ago for orders
 */
export function formatOrderTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "ახლახან";
  if (diffInMinutes < 60) return `${diffInMinutes} წუთის წინ`;
  if (diffInHours < 24) return `${diffInHours} საათის წინ`;
  if (diffInDays === 1) return "გუშინ";
  if (diffInDays < 7) return `${diffInDays} დღის წინ`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} კვირის წინ`;

  return new Date(date).toLocaleDateString("ka-GE");
}
