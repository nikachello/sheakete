"use server";

import { prisma } from "@/lib/prisma";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  startOfDay,
  endOfDay,
} from "date-fns";
import { ExpenseType } from "prisma/generated/prisma/client";

export interface FinancialsData {
  // Overall metrics
  totalRevenue: number;
  totalOrders: number;
  totalProfit: number;
  averageOrderValue: number;
  netProfit: number;

  // Payment status breakdown
  paymentBreakdown: {
    status: string;
    amount: number;
    count: number;
    percentage: number;
  }[];

  // Cost breakdown
  costBreakdown: {
    totalProductCosts: number;
    totalShippingFees: number;
    totalAdditionalCosts: number;
    totalCosts: number;
  };

  // Profit metrics
  profitMetrics: {
    grossProfit: number;
    profitMargin: number;
    deliveredOrdersProfit: number;
    deliveredOrdersMargin: number;
    netProfitMargin: number;
  };

  // Month comparison
  monthComparison: {
    currentMonth: {
      revenue: number;
      profit: number;
      orders: number;
    };
    previousMonth: {
      revenue: number;
      profit: number;
      orders: number;
    };
    growth: {
      revenueGrowth: number;
      profitGrowth: number;
      ordersGrowth: number;
    };
  };
}

export interface RevenueBreakdownData {
  period: string;
  revenue: number;
  profit: number;
  orders: number;
  date: Date;
}

export interface TopProductData {
  productId: string;
  productTitle: string;
  totalRevenue: number;
  totalProfit: number;
  orderCount: number;
  quantitySold: number;
  averagePrice: number;
}

export interface RemittanceData {
  id: string;
  createdAt: Date;
  totalAmount: number;
  bankReference: string | null;
  dateReceived: Date;
  orderCount: number;
  notes: string | null;
}

/**
 * Get comprehensive financial data
 */
export async function getFinancialsData(): Promise<FinancialsData> {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);
  const previousMonthStart = startOfMonth(subMonths(now, 1));
  const previousMonthEnd = endOfMonth(subMonths(now, 1));

  // Get all orders with financial data
  const [
    allOrders,
    currentMonthOrders,
    previousMonthOrders,
    paymentGroups,
    expenses,
  ] = await Promise.all([
    // All orders for overall metrics
    prisma.order.findMany({
      where: {
        type: "ORDER",
      },
      select: {
        actualPaidPrice: true,
        expectedPrice: true,
        productCost: true,
        shippingFee: true,
        additionalCosts: true,
        paymentStatus: true,
        status: true,
        quantity: true,
      },
    }),

    // Current month orders
    prisma.order.findMany({
      where: {
        type: "ORDER",
        createdAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
      select: {
        actualPaidPrice: true,
        expectedPrice: true,
        productCost: true,
        shippingFee: true,
        additionalCosts: true,
        quantity: true,
      },
    }),

    // Previous month orders
    prisma.order.findMany({
      where: {
        type: "ORDER",
        createdAt: {
          gte: previousMonthStart,
          lte: previousMonthEnd,
        },
      },
      select: {
        actualPaidPrice: true,
        expectedPrice: true,
        productCost: true,
        shippingFee: true,
        additionalCosts: true,
        quantity: true,
      },
    }),

    // Payment status grouping
    prisma.order.groupBy({
      by: ["paymentStatus"],
      where: {
        type: "ORDER",
      },
      _sum: {
        actualPaidPrice: true,
        expectedPrice: true,
      },
      _count: {
        id: true,
      },
    }),
    await prisma.expense.findMany({
      where: {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      },
      select: {
        amount: true,
        type: true,
      },
    }),
  ]);

  const marketingExpenses = expenses
    .filter((e) => e.type === ExpenseType.MARKETING)
    .reduce((sum, e) => sum + e.amount, 0);

  // Net profit = gross profit - expenses

  // Calculate overall metrics
  const totalRevenue = allOrders.reduce(
    (sum, order) => sum + (order.actualPaidPrice ?? order.expectedPrice),
    0
  );

  const totalCosts = allOrders.reduce(
    (sum, order) =>
      sum +
      order.productCost * order.quantity +
      order.shippingFee +
      order.additionalCosts,
    0
  );

  const totalProfit = totalRevenue - totalCosts;
  const totalOrders = allOrders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const netProfit = totalProfit - marketingExpenses;

  // Calculate payment breakdown
  const totalPaymentAmount = paymentGroups.reduce(
    (sum, group) =>
      sum + (group._sum.actualPaidPrice ?? group._sum.expectedPrice ?? 0),
    0
  );

  const paymentBreakdown = paymentGroups.map((group) => {
    const amount = group._sum.actualPaidPrice ?? group._sum.expectedPrice ?? 0;
    return {
      status: group.paymentStatus,
      amount,
      count: group._count.id,
      percentage:
        totalPaymentAmount > 0 ? (amount / totalPaymentAmount) * 100 : 0,
    };
  });

  // Calculate cost breakdown
  const costBreakdown = {
    totalProductCosts: allOrders.reduce(
      (sum, order) => sum + order.productCost * order.quantity,
      0
    ),
    totalShippingFees: allOrders.reduce(
      (sum, order) => sum + order.shippingFee,
      0
    ),
    totalAdditionalCosts: allOrders.reduce(
      (sum, order) => sum + order.additionalCosts,
      0
    ),
    totalCosts,
  };

  // Calculate profit metrics
  const deliveredOrders = allOrders.filter(
    (order) => order.status === "DELIVERED"
  );
  const deliveredRevenue = deliveredOrders.reduce(
    (sum, order) => sum + (order.actualPaidPrice ?? order.expectedPrice),
    0
  );
  const deliveredCosts = deliveredOrders.reduce(
    (sum, order) =>
      sum +
      order.productCost * order.quantity +
      order.shippingFee +
      order.additionalCosts,
    0
  );
  const deliveredProfit = deliveredRevenue - deliveredCosts;

  const profitMetrics = {
    grossProfit: totalProfit,
    profitMargin: totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0,
    deliveredOrdersProfit: deliveredProfit,
    deliveredOrdersMargin:
      deliveredRevenue > 0 ? (deliveredProfit / deliveredRevenue) * 100 : 0,
    netProfitMargin: netProfit > 0 ? (netProfit / totalRevenue) * 100 : 0,
  };

  // Calculate month comparison
  const currentMonthRevenue = currentMonthOrders.reduce(
    (sum, order) => sum + (order.actualPaidPrice ?? order.expectedPrice),
    0
  );
  const currentMonthCosts = currentMonthOrders.reduce(
    (sum, order) =>
      sum +
      order.productCost * order.quantity +
      order.shippingFee +
      order.additionalCosts,
    0
  );
  const currentMonthProfit = currentMonthRevenue - currentMonthCosts;

  const previousMonthRevenue = previousMonthOrders.reduce(
    (sum, order) => sum + (order.actualPaidPrice ?? order.expectedPrice),
    0
  );
  const previousMonthCosts = previousMonthOrders.reduce(
    (sum, order) =>
      sum +
      order.productCost * order.quantity +
      order.shippingFee +
      order.additionalCosts,
    0
  );
  const previousMonthProfit = previousMonthRevenue - previousMonthCosts;

  const monthComparison = {
    currentMonth: {
      revenue: currentMonthRevenue,
      profit: currentMonthProfit,
      orders: currentMonthOrders.length,
    },
    previousMonth: {
      revenue: previousMonthRevenue,
      profit: previousMonthProfit,
      orders: previousMonthOrders.length,
    },
    growth: {
      revenueGrowth:
        previousMonthRevenue > 0
          ? ((currentMonthRevenue - previousMonthRevenue) /
              previousMonthRevenue) *
            100
          : 0,
      profitGrowth:
        previousMonthProfit > 0
          ? ((currentMonthProfit - previousMonthProfit) / previousMonthProfit) *
            100
          : 0,
      ordersGrowth:
        previousMonthOrders.length > 0
          ? ((currentMonthOrders.length - previousMonthOrders.length) /
              previousMonthOrders.length) *
            100
          : 0,
    },
  };

  return {
    totalRevenue,
    totalOrders,
    totalProfit,
    averageOrderValue,
    paymentBreakdown,
    costBreakdown,
    profitMetrics,
    monthComparison,
    netProfit,
  };
}

/**
 * Get revenue breakdown by month (last 12 months)
 */
export async function getRevenueBreakdown(): Promise<RevenueBreakdownData[]> {
  const now = new Date();
  const monthsToFetch = 12;
  const breakdown: RevenueBreakdownData[] = [];

  for (let i = monthsToFetch - 1; i >= 0; i--) {
    const monthStart = startOfMonth(subMonths(now, i));
    const monthEnd = endOfMonth(subMonths(now, i));

    const orders = await prisma.order.findMany({
      where: {
        type: "ORDER",
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
      select: {
        actualPaidPrice: true,
        expectedPrice: true,
        productCost: true,
        shippingFee: true,
        additionalCosts: true,
        quantity: true,
      },
    });

    const revenue = orders.reduce(
      (sum, order) => sum + (order.actualPaidPrice ?? order.expectedPrice),
      0
    );

    const costs = orders.reduce(
      (sum, order) =>
        sum +
        order.productCost * order.quantity +
        order.shippingFee +
        order.additionalCosts,
      0
    );

    breakdown.push({
      period: monthStart.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      revenue,
      profit: revenue - costs,
      orders: orders.length,
      date: monthStart,
    });
  }

  return breakdown;
}

/**
 * Get top products by revenue
 */
export async function getTopProducts(
  limit: number = 10
): Promise<TopProductData[]> {
  // Fetch all delivered/shipped orders
  const orders = await prisma.order.findMany({
    where: {
      type: "ORDER",
      productId: {
        not: null,
      },
      productTitle: {
        not: null,
      },
      status: {
        in: ["DELIVERED", "SHIPPED"],
      },
    },
    select: {
      productId: true,
      productTitle: true,
      actualPaidPrice: true,
      expectedPrice: true,
      productCost: true,
      shippingFee: true,
      additionalCosts: true,
      quantity: true,
    },
  });

  // Group by product manually
  const productMap = new Map<
    string,
    {
      productId: string;
      productTitle: string;
      totalRevenue: number;
      totalCosts: number;
      orderCount: number;
      quantitySold: number;
    }
  >();

  orders.forEach((order) => {
    const key = order.productId!;
    const revenue = order.actualPaidPrice ?? order.expectedPrice;
    const costs =
      order.productCost * order.quantity +
      order.shippingFee +
      order.additionalCosts;

    if (productMap.has(key)) {
      const existing = productMap.get(key)!;
      existing.totalRevenue += revenue;
      existing.totalCosts += costs;
      existing.orderCount += 1;
      existing.quantitySold += order.quantity;
    } else {
      productMap.set(key, {
        productId: order.productId!,
        productTitle: order.productTitle!,
        totalRevenue: revenue,
        totalCosts: costs,
        orderCount: 1,
        quantitySold: order.quantity,
      });
    }
  });

  // Convert to array and sort by revenue
  return Array.from(productMap.values())
    .map((product) => ({
      productId: product.productId,
      productTitle: product.productTitle,
      totalRevenue: product.totalRevenue,
      totalProfit: product.totalRevenue - product.totalCosts,
      orderCount: product.orderCount,
      quantitySold: product.quantitySold,
      averagePrice:
        product.orderCount > 0 ? product.totalRevenue / product.orderCount : 0,
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit);
}

/**
 * Get recent remittances summary
 */
export async function getRemittancesSummary(
  limit: number = 10
): Promise<RemittanceData[]> {
  const remittances = await prisma.remittance.findMany({
    take: limit,
    orderBy: {
      dateReceived: "desc",
    },
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  return remittances.map((remittance) => ({
    id: remittance.id,
    createdAt: remittance.createdAt,
    totalAmount: remittance.totalAmount,
    bankReference: remittance.bankReference,
    dateReceived: remittance.dateReceived,
    orderCount: remittance._count.orders,
    notes: remittance.notes,
  }));
}
