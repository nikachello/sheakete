"use server";

import { prisma } from "@/lib/prisma";
import { RawDashboardData } from "@/types/dashboard";
import { activityMessageFromOrder } from "@/utils/formatter";
import { OrderStatus } from "generated/prisma/enums";
import { subHours } from "date-fns";
import { mapOrderToAttentionRow } from "@/utils/mappers";

/**
 * Fetch raw dashboard statistics from database
 * This function only handles data fetching - no business logic or formatting
 *
 * @returns Raw aggregated data from Prisma queries
 */
export async function getDashboardStats(): Promise<RawDashboardData> {
  const [statusGroups, paymentGroups, currentMonth] = await Promise.all([
    // Group orders by status and sum expected prices
    prisma.order.groupBy({
      by: ["status"],
      _sum: {
        expectedPrice: true,
        additionalCosts: true,
      },
      _count: {
        id: true,
      },
    }),

    // Group orders by payment status and sum both expected and actual prices
    prisma.order.groupBy({
      by: ["paymentStatus"],
      _sum: {
        expectedPrice: true,
        actualPaidPrice: true,
      },
      _count: {
        id: true,
      },
    }),

    getCurrentMonthProfit(),
  ]);

  return {
    statusGroups,
    paymentGroups,
    currentMonth,
  };
}

/**
 * Alternative: Fetch dashboard stats with date range filtering
 * Use this for historical comparisons or specific time periods
 *
 * @param startDate - Start of date range
 * @param endDate - End of date range
 * @returns Raw aggregated data for the specified period
 */
export async function getDashboardStatsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<RawDashboardData> {
  const [statusGroups, paymentGroups, currentMonth] = await Promise.all([
    prisma.order.groupBy({
      by: ["status"],
      _sum: {
        expectedPrice: true,
        additionalCosts: true,
      },
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    }),

    prisma.order.groupBy({
      by: ["paymentStatus"],
      _sum: {
        expectedPrice: true,
        actualPaidPrice: true,
      },
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    }),
    getCurrentMonthProfit(),
  ]);

  return {
    statusGroups,
    paymentGroups,
    currentMonth,
  };
}

/**
 * Get dashboard stats for current and previous periods
 * Useful for trend calculations
 *
 * @param currentStart - Start of current period
 * @param currentEnd - End of current period
 * @param previousStart - Start of previous period
 * @param previousEnd - End of previous period
 * @returns Object containing both current and previous period data
 */
export async function getDashboardStatsWithComparison(
  currentStart: Date,
  currentEnd: Date,
  previousStart: Date,
  previousEnd: Date
) {
  const [current, previous] = await Promise.all([
    getDashboardStatsByDateRange(currentStart, currentEnd),
    getDashboardStatsByDateRange(previousStart, previousEnd),
  ]);

  return {
    current,
    previous,
  };
}

export async function getCurrentMonthProfit() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const deliveredOrders = await prisma.order.findMany({
    where: {
      status: OrderStatus.DELIVERED,
      updatedAt: { gte: startOfMonth },
    },
    select: {
      actualPaidPrice: true,
      productCost: true,
      shippingFee: true,
      additionalCosts: true,
    },
  });

  let totalRevenue = 0;
  let totalCosts = 0;

  deliveredOrders.forEach((order) => {
    totalRevenue += order.actualPaidPrice || 0;

    totalCosts +=
      (order.productCost || 0) +
      (order.shippingFee || 0) +
      (order.additionalCosts || 0);
  });

  const grossProfit = totalRevenue - totalCosts;
  const profitMargin =
    totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  return {
    revenue: totalRevenue,
    costs: totalCosts,
    profit: grossProfit,
    margin: profitMargin,
    orderCount: deliveredOrders.length,
  };
}

export async function getRecentActivity(limit = 10) {
  const orders = await prisma.order.findMany({
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      status: true,
      updatedAt: true,
      actualPaidPrice: true,
      productTitle: true,
      customerName: true,
      comboDetails: true,
    },
  });

  return orders.map((order) => ({
    type: "order" as const,
    id: order.id,
    comboDetails: order.comboDetails,
    customerName: order.customerName,
    productTitle: order.productTitle,
    message: activityMessageFromOrder(order),
    timestamp: order.updatedAt,
  }));
}

// lib/admin-actions.ts

export async function getNeedsAttention(limit = 10) {
  const now = new Date();

  // Orders confirmed but not shipped > 24h
  const confirmedNotShipped = prisma.order.findMany({
    where: {
      status: OrderStatus.CONFIRMED,
      updatedAt: { lt: subHours(now, 24) },
    },
    select: {
      id: true,
      status: true,
      updatedAt: true,
      actualPaidPrice: true,
    },
  });

  // Orders delivered but not settled > 48h
  const deliveredNotSettled = prisma.order.findMany({
    where: {
      status: OrderStatus.DELIVERED,
      updatedAt: { lt: subHours(now, 48) },
    },
    select: {
      id: true,
      status: true,
      updatedAt: true,
      actualPaidPrice: true,
    },
  });

  // Returned orders
  const returnedOrders = prisma.order.findMany({
    where: { status: OrderStatus.RETURNED },
    select: {
      id: true,
      status: true,
      updatedAt: true,
      actualPaidPrice: true,
    },
  });

  const [a, b, c] = await Promise.all([
    confirmedNotShipped,
    deliveredNotSettled,
    returnedOrders,
  ]);

  // Combine, sort by oldest first
  const all = [...a, ...b, ...c].sort(
    (x, y) => x.updatedAt.getTime() - y.updatedAt.getTime()
  );

  return all.slice(0, limit).map(mapOrderToAttentionRow);
}
