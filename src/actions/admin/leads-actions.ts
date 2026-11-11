"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus, OrderType } from "@prisma-client";
import { requireAdmin } from "@/lib/admin-auth";
import { confirmLead as confirmLeadTransition } from "@/services/analytics/confirm-lead.service";
import { scheduleConversions } from "@/lib/meta/outbox";
import { z } from "zod";

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
    await requireAdmin();
    z.string().uuid().parse(leadId);
    const updatedOrder = await prisma.$transaction(async (tx) => {
      await confirmLeadTransition(tx, leadId);
      return tx.order.findUniqueOrThrow({ where: { id: leadId } });
    });
    scheduleConversions(leadId);

    revalidatePath("/leads");
    revalidatePath("/admin/leads");

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
    const existingLead = await prisma.order.findUnique({
      where: { id: leadId },
    });

    const updatedOrder = await prisma.order.update({
      where: { id: leadId },
      data: {
        status: OrderStatus.CANCELLED,
        notes: reason
          ? `გაუქმების მიზეზი: ${reason}\n\n${existingLead?.notes || ""}`
          : existingLead?.notes,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/leads");
    revalidatePath("/admin/leads");

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
    const existingLead = await prisma.order.findUnique({
      where: { id: leadId },
    });

    const updatedOrder = await prisma.order.update({
      where: { id: leadId },
      data: {
        status: OrderStatus.NO_ANSWER,
        notes: note
          ? `${note}\n\n${existingLead?.notes || ""}`
          : existingLead?.notes,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/leads");
    revalidatePath("/admin/leads");

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
    await requireAdmin();
    const ids = z.array(z.string().uuid()).max(100).parse(leadIds);
    const count = await prisma.$transaction(async (tx) => {
      let confirmed = 0;
      for (const id of ids) {
        if (await confirmLeadTransition(tx, id)) confirmed++;
      }
      return confirmed;
    });
    scheduleConversions();

    revalidatePath("/leads");
    revalidatePath("/admin/leads");

    return { success: true, count };
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
  await requireAdmin();
  if (typeof data.expectedPrice === "string") {
    data.expectedPrice = parseFloat(data.expectedPrice);
    if (isNaN(data.expectedPrice)) {
      data.expectedPrice = 0; // fallback
    }
  }

  if (data.status === OrderStatus.CONFIRMED) {
    await prisma.$transaction((tx) => confirmLeadTransition(tx, id, data));
    scheduleConversions(id);
  } else {
    await prisma.order.update({ where: { id }, data });
  }

  revalidatePath("/leads");
  revalidatePath("/admin/leads");
}

export async function confirmLeadAndCreateOrder(
  leadId: string,
  data: {
    city?: string;
    address?: string;
    productTitle?: string;
    productId?: string;
    expectedPrice?: number;
    quantity: number;
    productCost?: number;
    shippingFee?: number;
    additionalCosts?: number;
    comboDetails?: string;
    notes?: string;
  }
) {
  await requireAdmin();
  z.string().uuid().parse(leadId);
  const input = z.object({
    city: z.string().trim().max(100).optional(),
    address: z.string().trim().max(500).optional(),
    productTitle: z.string().max(300).optional(),
    productId: z.string().max(128).optional(),
    expectedPrice: z.number().positive().finite().optional(),
    quantity: z.number().int().positive().max(1000),
    productCost: z.number().nonnegative().finite().optional(),
    shippingFee: z.number().nonnegative().finite().optional(),
    additionalCosts: z.number().nonnegative().finite().optional(),
    comboDetails: z.string().max(1000).optional(),
    notes: z.string().max(2000).optional(),
  }).parse(data);
  await prisma.$transaction((tx) => confirmLeadTransition(tx, leadId, {
      ...input,
      productCost: input.productCost ?? 0,
      shippingFee: input.shippingFee ?? 0,
      additionalCosts: input.additionalCosts ?? 0,
  }));
  scheduleConversions(leadId);

  revalidatePath("/leads");
  revalidatePath("/admin/leads");
  revalidatePath("/orders");
  revalidatePath("/admin/orders");
}
