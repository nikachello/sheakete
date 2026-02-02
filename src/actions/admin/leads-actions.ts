"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus, OrderType } from "generated/prisma/enums";
import { revalidatePath } from "next/cache";

export const getLeadsStats = async () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  // Execute all queries in a single database transaction
  const [
    activeLeads,
    needsFollowUp,
    todayLeads,
    yesterdayLeads,
    weeklyConfirmed,
    weeklyTotal,
  ] = await prisma.$transaction([
    prisma.order.count({
      where: { type: OrderType.LEAD, status: OrderStatus.PENDING },
    }),
    prisma.order.count({
      where: { type: OrderType.LEAD, status: OrderStatus.NO_ANSWER },
    }),
    prisma.order.count({
      where: { type: OrderType.LEAD, createdAt: { gte: today } },
    }),
    prisma.order.count({
      where: {
        type: OrderType.LEAD,
        createdAt: { gte: yesterday, lt: today },
      },
    }),
    // Logic fix: count everything confirmed this week, regardless of creation date
    prisma.order.count({
      where: {
        status: OrderStatus.CONFIRMED,
        updatedAt: { gte: weekAgo },
      },
    }),
    prisma.order.count({
      where: { type: OrderType.LEAD, createdAt: { gte: weekAgo } },
    }),
  ]);

  // Use Number() to ensure float division and avoid any JS engine weirdness
  const conversionRate =
    weeklyTotal > 0 ? (Number(weeklyConfirmed) / Number(weeklyTotal)) * 100 : 0;

  const todayTrend =
    yesterdayLeads > 0
      ? ((todayLeads - yesterdayLeads) / yesterdayLeads) * 100
      : todayLeads > 0
        ? 100
        : 0;

  return {
    activeLeads: { count: activeLeads, label: "აქტიური ლიდები" },
    conversionRate: {
      percentage: Number(conversionRate.toFixed(2)), // Clean up decimals
      confirmed: weeklyConfirmed,
      total: weeklyTotal,
      label: "კონვერსიის მაჩვენებელი",
    },
    needsFollowUp: {
      count: needsFollowUp,
      label: "საჭიროებს შემდგომ კონტაქტს",
    },
    todayLeads: {
      count: todayLeads,
      trend: Number(todayTrend.toFixed(2)),
      yesterdayCount: yesterdayLeads,
      label: "დღეს შემოსული ლიდები",
    },
  };
};

export async function getLeadsAnalytics() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [statusBreakdown, dailyLeads] = await Promise.all([
    // Status breakdown
    prisma.order.groupBy({
      by: ["status"],
      where: {
        type: OrderType.LEAD,
        createdAt: { gte: thirtyDaysAgo },
      },
      _count: {
        id: true,
      },
    }),

    // Daily lead creation for the last 30 days
    prisma.$queryRaw`
      SELECT 
        DATE("createdAt") as date,
        COUNT(*) as count
      FROM "Order"
      WHERE "type" = 'LEAD'
        AND "createdAt" >= ${thirtyDaysAgo}
      GROUP BY DATE("createdAt")
      ORDER BY date DESC
    `,
  ]);

  return {
    statusBreakdown,
    dailyLeads,
  };
}

/**
 * Quick action: Confirm a lead (convert to order)
 */
export async function confirmLead(leadId: string) {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: leadId },
      data: {
        status: OrderStatus.CONFIRMED,
        type: OrderType.ORDER,
        updatedAt: new Date(),
      },
    });

    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error("Error confirming lead:", error);
    return { success: false, error: "Failed to confirm lead" };
  }
}

/**
 * Quick action: Cancel a lead
 */
export async function cancelLead(leadId: string, reason?: string) {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: leadId },
      data: {
        status: OrderStatus.CANCELLED,
        notes: reason
          ? `გაუქმების მიზეზი: ${reason}${
              "\n\n" +
                (await prisma.order.findUnique({ where: { id: leadId } }))
                  ?.notes || ""
            }`
          : undefined,
        updatedAt: new Date(),
      },
    });

    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error("Error cancelling lead:", error);
    return { success: false, error: "Failed to cancel lead" };
  }
}

/**
 * Quick action: Mark as "No Answer"
 */
export async function markAsNoAnswer(leadId: string, note?: string) {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: leadId },
      data: {
        status: OrderStatus.NO_ANSWER,
        notes: note
          ? `${note}${
              "\n\n" +
                (await prisma.order.findUnique({ where: { id: leadId } }))
                  ?.notes || ""
            }`
          : undefined,
        updatedAt: new Date(),
      },
    });

    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error("Error marking as no answer:", error);
    return { success: false, error: "Failed to update lead" };
  }
}

/**
 * Bulk action: Confirm multiple leads
 */
export async function confirmMultipleLeads(leadIds: string[]) {
  try {
    const result = await prisma.order.updateMany({
      where: {
        id: { in: leadIds },
        type: OrderType.LEAD,
      },
      data: {
        status: OrderStatus.CONFIRMED,
        type: OrderType.ORDER,
        updatedAt: new Date(),
      },
    });

    return { success: true, count: result.count };
  } catch (error) {
    console.error("Error confirming multiple leads:", error);
    return { success: false, error: "Failed to confirm leads" };
  }
}

/**
 * Get lead by ID
 */
export async function getLeadById(leadId: string) {
  try {
    const lead = await prisma.order.findUnique({
      where: { id: leadId },
    });

    return { success: true, lead };
  } catch (error) {
    console.error("Error fetching lead:", error);
    return { success: false, error: "Failed to fetch lead" };
  }
}

export const getLeads = async () => {
  return await prisma.order.findMany({
    where: {
      type: "LEAD",
      status: {
        notIn: ["SHIPPED", "DELIVERED", "RETURNED"],
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export async function updateLead(
  id: string,
  data: Partial<{
    customerName: string;
    customerPhone: string;
    status: OrderStatus;
    expectedPrice: number;
  }>
) {
  if (typeof data.expectedPrice === "string") {
    data.expectedPrice = parseFloat(data.expectedPrice);
    if (isNaN(data.expectedPrice)) {
      data.expectedPrice = 0; // fallback
    }
  }

  await prisma.order.update({
    where: { id },
    data,
  });

  revalidatePath("/leads");
}

export async function confirmLeadAndCreateOrder(
  leadId: string,
  data: {
    city?: string;
    address?: string;
    productTitle?: string;
    expectedPrice?: number;
  }
) {
  await prisma.order.update({
    where: { id: leadId },
    data: {
      type: "ORDER",
      status: "CONFIRMED",
      city: data.city,
      address: data.address,
      productTitle: data.productTitle,
      expectedPrice: data.expectedPrice,
    },
  });

  revalidatePath("/leads");
}
