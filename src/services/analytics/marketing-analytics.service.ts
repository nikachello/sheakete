import { prisma } from "@/lib/prisma";
import { startOfDay, endOfDay, differenceInDays, subDays } from "date-fns";
import { OrderStatus } from "prisma/generated/prisma/client";

export interface CampaignPerformance {
  campaignId: string;
  name: string;
  platform: string;
  productId: string | null;
  productTitle: string | null;
  isActive: boolean;

  // Spend
  totalSpend: number;
  periodDays: number;
  dailySpend: number;

  // Results
  totalOrders: number; // DELIVERED orders
  totalRevenue: number;
  totalProfit: number; // revenue - spend - COGS

  // KPIs
  costPerOrder: number;
  roas: number; // revenue / spend
  roi: number; // profit / spend * 100

  // Signals
  performanceLabel: "excellent" | "good" | "break_even" | "losing";
}

export interface MarketingOverview {
  period: { from: Date; to: Date };
  totalSpend: number;
  totalRevenue: number;
  blendedROAS: number;
  blendedCostPerOrder: number;
  campaigns: CampaignPerformance[];

  // Spend by platform
  byPlatform: Record<string, { spend: number; orders: number; roas: number }>;

  // Week-over-week
  spendGrowthWoW: number | null;
  revenueGrowthWoW: number | null;
}

export class MarketingAnalyticsService {
  async getCampaignPerformance(
    campaignId: string,
    from?: Date,
    to?: Date
  ): Promise<CampaignPerformance | null> {
    const campaign = await prisma.marketingCampaign.findUnique({
      where: { id: campaignId },
      include: {
        spendLogs: {
          where: {
            date: {
              gte: from ? startOfDay(from) : undefined,
              lte: to ? endOfDay(to) : undefined,
            },
          },
        },
        orders: {
          where: {
            status: OrderStatus.DELIVERED,
            createdAt: {
              gte: from ? startOfDay(from) : undefined,
              lte: to ? endOfDay(to) : undefined,
            },
          },
          select: {
            expectedPrice: true,
            actualPaidPrice: true,
            productCost: true,
            quantity: true,
          },
        },
      },
    });

    if (!campaign) return null;

    const totalSpend =
      campaign.spendLogs.length > 0
        ? campaign.spendLogs.reduce((s, l) => s + l.spend, 0)
        : campaign.spend;

    const fromDate = from ?? campaign.startDate;
    const toDate = to ?? campaign.endDate ?? new Date();
    const periodDays = Math.max(1, differenceInDays(toDate, fromDate) + 1);

    const totalOrders = campaign.orders.length;
    const totalRevenue = campaign.orders.reduce(
      (sum, o) => sum + (o.actualPaidPrice ?? o.expectedPrice) * o.quantity,
      0
    );
    const totalCogs = campaign.orders.reduce(
      (sum, o) => sum + o.productCost * o.quantity,
      0
    );
    const totalProfit = totalRevenue - totalCogs - totalSpend;

    const costPerOrder = totalOrders > 0 ? totalSpend / totalOrders : 0;
    const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;
    const roi = totalSpend > 0 ? (totalProfit / totalSpend) * 100 : 0;

    let performanceLabel: CampaignPerformance["performanceLabel"] = "losing";
    if (roas >= 3) performanceLabel = "excellent";
    else if (roas >= 2) performanceLabel = "good";
    else if (roas >= 1) performanceLabel = "break_even";

    return {
      campaignId,
      name: campaign.name,
      platform: campaign.platform,
      productId: campaign.productId,
      productTitle: campaign.productTitle,
      isActive: campaign.isActive,
      totalSpend,
      periodDays,
      dailySpend: totalSpend / periodDays,
      totalOrders,
      totalRevenue,
      totalProfit,
      costPerOrder,
      roas,
      roi,
      performanceLabel,
    };
  }

  async getOverview(from: Date, to: Date): Promise<MarketingOverview> {
    const campaigns = await prisma.marketingCampaign.findMany({
      where: {
        OR: [
          { startDate: { lte: to } },
          { endDate: { gte: from } },
          { endDate: null },
        ],
      },
    });

    const performances = (
      await Promise.all(
        campaigns.map((c) => this.getCampaignPerformance(c.id, from, to))
      )
    ).filter(Boolean) as CampaignPerformance[];

    const totalSpend = performances.reduce((s, p) => s + p.totalSpend, 0);
    const totalRevenue = performances.reduce((s, p) => s + p.totalRevenue, 0);
    const totalOrders = performances.reduce((s, p) => s + p.totalOrders, 0);

    // Also add unattributed marketing expenses
    const unattributedExpenses = await prisma.expense.aggregate({
      where: {
        type: "MARKETING",
        createdAt: { gte: startOfDay(from), lte: endOfDay(to) },
      },
      _sum: { amount: true },
    });
    // Use expense total if campaigns don't have spend
    const effectiveTotalSpend =
      totalSpend > 0 ? totalSpend : (unattributedExpenses._sum.amount ?? 0);

    // Group by platform
    const byPlatform: MarketingOverview["byPlatform"] = {};
    for (const p of performances) {
      if (!byPlatform[p.platform]) {
        byPlatform[p.platform] = { spend: 0, orders: 0, roas: 0 };
      }
      byPlatform[p.platform].spend += p.totalSpend;
      byPlatform[p.platform].orders += p.totalOrders;
    }
    for (const platform of Object.values(byPlatform)) {
      platform.roas = platform.spend > 0 ? totalRevenue / platform.spend : 0;
    }

    // Week-over-week comparison
    const periodDays = differenceInDays(to, from) + 1;
    const prevFrom = subDays(from, periodDays);
    const prevTo = subDays(from, 1);

    const prevExpenses = await prisma.expense.aggregate({
      where: {
        type: "MARKETING",
        createdAt: {
          gte: startOfDay(prevFrom),
          lte: endOfDay(prevTo),
        },
      },
      _sum: { amount: true },
    });
    const prevSpend = prevExpenses._sum.amount ?? 0;

    const prevOrders = await prisma.order.findMany({
      where: {
        status: OrderStatus.DELIVERED,
        createdAt: {
          gte: startOfDay(prevFrom),
          lte: endOfDay(prevTo),
        },
      },
      select: { expectedPrice: true, actualPaidPrice: true, quantity: true },
    });
    const prevRevenue = prevOrders.reduce(
      (sum, o) => sum + (o.actualPaidPrice ?? o.expectedPrice) * o.quantity,
      0
    );

    return {
      period: { from, to },
      totalSpend: effectiveTotalSpend,
      totalRevenue,
      blendedROAS:
        effectiveTotalSpend > 0 ? totalRevenue / effectiveTotalSpend : 0,
      blendedCostPerOrder:
        totalOrders > 0 ? effectiveTotalSpend / totalOrders : 0,
      campaigns: performances,
      byPlatform,
      spendGrowthWoW:
        prevSpend > 0
          ? ((effectiveTotalSpend - prevSpend) / prevSpend) * 100
          : null,
      revenueGrowthWoW:
        prevRevenue > 0
          ? ((totalRevenue - prevRevenue) / prevRevenue) * 100
          : null,
    };
  }

  /**
   * Log daily spend for a campaign (call this from your UI or a daily form)
   */
  async logSpend(
    campaignId: string,
    date: Date,
    spend: number,
    impressions?: number,
    clicks?: number
  ): Promise<void> {
    await prisma.$transaction([
      prisma.campaignSpendLog.create({
        data: { campaignId, date, spend, impressions, clicks },
      }),
      prisma.marketingCampaign.update({
        where: { id: campaignId },
        data: { spend: { increment: spend } },
      }),
    ]);
  }
}

export const marketingAnalyticsService = new MarketingAnalyticsService();
