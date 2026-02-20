"use server";

import { prisma } from "@/lib/prisma";
import { marketingAnalyticsService } from "@/services/analytics/marketing-analytics.service";
import { endOfMonth, startOfMonth } from "date-fns";
import { revalidatePath } from "next/cache";
import { MarketingPlatform } from "prisma/generated/prisma/client";

export async function createMarketingCampaign(data: {
  name: string;
  platform: MarketingPlatform;
  productId?: string;
  productTitle?: string;
  startDate: Date;
  notes?: string;
}) {
  try {
    const campaign = await prisma.marketingCampaign.create({ data });
    revalidatePath("/marketing");
    return { success: true, data: campaign };
  } catch (error) {
    return { success: false, error: "Failed to create campaign" };
  }
}

export async function logCampaignSpend(
  campaignId: string,
  date: Date,
  spend: number,
  impressions?: number,
  clicks?: number
) {
  try {
    await marketingAnalyticsService.logSpend(
      campaignId,
      date,
      spend,
      impressions,
      clicks
    );
    revalidatePath("/marketing");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to log spend" };
  }
}

export async function getMarketingOverview(from?: Date, to?: Date) {
  try {
    const start = from ?? startOfMonth(new Date());
    const end = to ?? endOfMonth(new Date());
    const data = await marketingAnalyticsService.getOverview(start, end);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get marketing overview" };
  }
}

export async function getCampaigns() {
  try {
    const data = await prisma.marketingCampaign.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { orders: true, spendLogs: true } } },
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get campaigns" };
  }
}
