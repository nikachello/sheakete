import { prisma } from "@/lib/prisma";
import {
  startOfWeek,
  endOfWeek,
  subWeeks,
  startOfDay,
  endOfDay,
} from "date-fns";
import { OrderStatus } from "@prisma-client";

export interface WeeklyTrend {
  weeks: {
    weekStart: Date;
    weekEnd: Date;
    revenue: number;
    orders: number;
    returnRate: number;
    grossMargin: number;
    netMargin: number;
    adSpend: number;
    roas: number | null;
    costPerOrder: number | null;
    bankBalance: number;
  }[];

  // Growth signals
  revenueGrowth4wAvg: number | null;
  marginTrend: "improving" | "stable" | "compressing";
  roasTrend: "improving" | "stable" | "declining" | "no_data";
}

export class WeeklySnapshotService {
  /**
   * Take a snapshot of the current week's metrics.
   * Should be called at end of week (e.g., Sunday night cron).
   */
  async captureWeekSnapshot(weekOffset: number = 0): Promise<void> {
    const now = new Date();
    const weekStart = startOfWeek(subWeeks(now, weekOffset), {
      weekStartsOn: 1,
    });
    const weekEnd = endOfWeek(subWeeks(now, weekOffset), { weekStartsOn: 1 });

    // Check if snapshot already exists
    const existing = await prisma.weeklyMetricSnapshot.findUnique({
      where: { weekStart },
    });
    if (existing) return; // already captured

    // Orders
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfDay(weekStart),
          lte: endOfDay(weekEnd),
        },
        type: "ORDER",
      },
      select: {
        status: true,
        expectedPrice: true,
        actualPaidPrice: true,
        productCost: true,
        shippingFee: true,
        quantity: true,
      },
    });

    const delivered = orders.filter((o) => o.status === OrderStatus.DELIVERED);
    const returned = orders.filter((o) => o.status === OrderStatus.RETURNED);
    const cancelled = orders.filter((o) => o.status === OrderStatus.CANCELLED);

    const totalRevenue = delivered.reduce(
      (sum, o) => sum + (o.actualPaidPrice ?? o.expectedPrice) * o.quantity,
      0
    );
    const totalCogs = delivered.reduce(
      (sum, o) => sum + o.productCost * o.quantity,
      0
    );
    const totalShipping = delivered.reduce((sum, o) => sum + o.shippingFee, 0);

    const grossProfit = totalRevenue - totalCogs;
    const grossMargin = totalRevenue > 0 ? grossProfit / totalRevenue : 0;

    // Expenses
    const expenses = await prisma.expense.findMany({
      where: {
        createdAt: {
          gte: startOfDay(weekStart),
          lte: endOfDay(weekEnd),
        },
      },
      select: { type: true, amount: true },
    });

    const totalAdSpend = expenses
      .filter((e) => e.type === "MARKETING")
      .reduce((sum, e) => sum + e.amount, 0);

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netProfit = grossProfit - totalShipping - totalExpenses;
    const netMargin = totalRevenue > 0 ? netProfit / totalRevenue : 0;

    // Return rate
    const returnRate =
      delivered.length + returned.length > 0
        ? returned.length / (delivered.length + returned.length)
        : 0;

    // ROAS
    const roas = totalAdSpend > 0 ? totalRevenue / totalAdSpend : null;
    const costPerOrder =
      delivered.length > 0 && totalAdSpend > 0
        ? totalAdSpend / delivered.length
        : null;

    // Inventory value
    const stocks = await prisma.stock.findMany({
      select: { quantityOnHand: true, averageCost: true },
    });
    const totalInventoryValue = stocks.reduce(
      (sum, s) => sum + s.quantityOnHand * (s.averageCost ?? 0),
      0
    );

    // Inventory turnover (COGS / avg inventory — weekly approximation)
    const inventoryTurnover =
      totalInventoryValue > 0 ? totalCogs / totalInventoryValue : null;

    // Bank balance
    const bankTxns = await prisma.bankTransaction.findMany({
      where: {
        createdAt: { lte: endOfDay(weekEnd) },
      },
      select: { amount: true, type: true },
    });
    const bankBalance = bankTxns.reduce(
      (sum, t) => sum + (t.type === "IN" ? t.amount : -t.amount),
      0
    );

    // Founder loan balance
    const founderLoans = await prisma.founderLoanTransaction.findMany({
      where: {
        createdAt: { lte: endOfDay(weekEnd) },
      },
      select: { amount: true, type: true },
    });
    const founderLoanBalance = founderLoans.reduce(
      (sum, t) =>
        sum + (t.type === "COMPANY_OWES_FOUNDER" ? t.amount : -t.amount),
      0
    );

    await prisma.weeklyMetricSnapshot.create({
      data: {
        weekStart,
        weekEnd,
        totalRevenue,
        totalOrders: orders.length,
        deliveredOrders: delivered.length,
        returnedOrders: returned.length,
        cancelledOrders: cancelled.length,
        returnRate,
        grossProfit,
        grossMargin,
        netProfit,
        netMargin,
        totalAdSpend,
        costPerOrder,
        roas,
        totalInventoryValue,
        inventoryTurnover,
        bankBalance,
        founderLoanBalance,
      },
    });
  }

  /**
   * Get weekly trends for the last N weeks
   */
  async getWeeklyTrends(weeksBack: number = 12): Promise<WeeklyTrend> {
    const snapshots = await prisma.weeklyMetricSnapshot.findMany({
      orderBy: { weekStart: "asc" },
      take: weeksBack,
    });

    const weeks = snapshots.map((s) => ({
      weekStart: s.weekStart,
      weekEnd: s.weekEnd,
      revenue: s.totalRevenue,
      orders: s.deliveredOrders,
      returnRate: s.returnRate * 100,
      grossMargin: s.grossMargin * 100,
      netMargin: s.netMargin * 100,
      adSpend: s.totalAdSpend,
      roas: s.roas,
      costPerOrder: s.costPerOrder,
      bankBalance: s.bankBalance,
    }));

    // 4-week average revenue growth
    let revenueGrowth4wAvg: number | null = null;
    if (snapshots.length >= 5) {
      const recent = snapshots.slice(-4);
      const growthRates = recent.slice(1).map((s, i) => {
        const prev = recent[i].totalRevenue;
        return prev > 0 ? ((s.totalRevenue - prev) / prev) * 100 : 0;
      });
      revenueGrowth4wAvg =
        growthRates.reduce((s, g) => s + g, 0) / growthRates.length;
    }

    // Margin trend
    let marginTrend: WeeklyTrend["marginTrend"] = "stable";
    if (snapshots.length >= 4) {
      const recent = snapshots.slice(-4);
      const firstAvg = (recent[0].netMargin + recent[1].netMargin) / 2;
      const lastAvg = (recent[2].netMargin + recent[3].netMargin) / 2;
      const delta = (lastAvg - firstAvg) * 100;
      if (delta > 2) marginTrend = "improving";
      else if (delta < -2) marginTrend = "compressing";
    }

    // ROAS trend
    let roasTrend: WeeklyTrend["roasTrend"] = "no_data";
    const withRoas = snapshots.filter((s) => s.roas !== null);
    if (withRoas.length >= 3) {
      const recent = withRoas.slice(-3);
      const firstRoas = recent[0].roas!;
      const lastRoas = recent[2].roas!;
      const delta = ((lastRoas - firstRoas) / firstRoas) * 100;
      if (delta > 10) roasTrend = "improving";
      else if (delta < -10) roasTrend = "declining";
      else roasTrend = "stable";
    }

    return { weeks, revenueGrowth4wAvg, marginTrend, roasTrend };
  }
}

export const weeklySnapshotService = new WeeklySnapshotService();
