"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  InventoryOrderStatus,
  ShippingMode,
  MarketingPlatform,
} from "prisma/generated/prisma/client";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  startOfDay,
  endOfDay,
} from "date-fns";
import { productProfitabilityService } from "@/services/analytics/product-profitability.service";
import { cashFlowProjectionService } from "@/services/financial/cash-flow-procetion.service";
import { velocityService } from "@/services/inventory/velocity.service";
import {
  CreateInventoryOrderInput,
  inventoryOrderRepository,
} from "@/repositories/invetory-order.repository";
import { marketingAnalyticsService } from "@/services/analytics/marketing-analytics.service";
import { alertEngine } from "@/services/alerts/alert-engine.service";
import { weeklySnapshotService } from "@/services/analytics/weekly-snapshot.service";

// ─── Product Profitability ────────────────────────────────────────────────────

export async function getProductProfitability(from?: Date, to?: Date) {
  try {
    const start = from ?? startOfMonth(new Date());
    const end = to ?? endOfMonth(new Date());
    const data = await productProfitabilityService.calculateAllProducts(
      start,
      end
    );
    return { success: true, data };
  } catch (error) {
    console.error("Failed to get product profitability:", error);
    return {
      success: false,
      error: "Failed to calculate product profitability",
    };
  }
}

export async function getSingleProductProfitability(
  productId: string,
  from?: Date,
  to?: Date
) {
  try {
    const start = from ?? startOfMonth(new Date());
    const end = to ?? endOfMonth(new Date());
    const data = await productProfitabilityService.calculateSingleProduct(
      productId,
      start,
      end
    );
    return { success: true, data };
  } catch (error) {
    console.error("Failed to get product profitability:", error);
    return {
      success: false,
      error: "Failed to calculate product profitability",
    };
  }
}

export async function getProductProfitTrends(
  productId: string,
  weeks: number = 8
) {
  try {
    const data = await productProfitabilityService.getProductTrends(
      productId,
      weeks
    );
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get product trends" };
  }
}

// ─── Cash Flow Projection ─────────────────────────────────────────────────────

export async function getCashFlowForecast(daysAhead: number = 60) {
  try {
    const data = await cashFlowProjectionService.getForecast(daysAhead);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to get cash flow forecast:", error);
    return { success: false, error: "Failed to calculate cash flow forecast" };
  }
}

// ─── Velocity & Reorder ───────────────────────────────────────────────────────

export async function getVelocityData() {
  try {
    const data = await velocityService.getVelocityData();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get velocity data" };
  }
}

export async function getReorderSignals() {
  try {
    const data = await velocityService.getReorderSignals();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get reorder signals" };
  }
}

export async function triggerVelocityUpdate() {
  try {
    await velocityService.updateStockVelocities();
    revalidatePath("/stocks");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update velocities" };
  }
}

// ─── Inventory Orders (China purchases) ──────────────────────────────────────

export async function createInventoryOrder(input: CreateInventoryOrderInput) {
  try {
    const order = await inventoryOrderRepository.create(input);
    revalidatePath("/inventory");
    revalidatePath("/stocks");
    return { success: true, data: order };
  } catch (error) {
    console.error("Failed to create inventory order:", error);
    return { success: false, error: "Failed to create inventory order" };
  }
}

export async function updateInventoryOrderStatus(
  id: string,
  status: InventoryOrderStatus,
  arrivedAt?: Date
) {
  try {
    const order = await inventoryOrderRepository.updateStatus(
      id,
      status,
      arrivedAt
    );

    // If order arrived, create a stock movement automatically
    if (status === InventoryOrderStatus.ARRIVED) {
      const inventoryOrder = await prisma.inventoryOrder.findUnique({
        where: { id },
      });
      if (inventoryOrder) {
        // Update stock via purchase movement
        await prisma.$transaction([
          prisma.stockMovement.create({
            data: {
              productId: inventoryOrder.productId,
              productTitle: inventoryOrder.productTitle,
              quantity: inventoryOrder.quantity,
              type: "PURCHASE",
              unitCost: inventoryOrder.landedCostGEL,
              totalCost: inventoryOrder.totalInvestment,
              notes: `Inventory order arrived (${inventoryOrder.shippingMode})`,
            },
          }),
          prisma.stock.upsert({
            where: { productId: inventoryOrder.productId },
            create: {
              productId: inventoryOrder.productId,
              productTitle: inventoryOrder.productTitle,
              quantityOnHand: inventoryOrder.quantity,
              quantity: inventoryOrder.quantity,
              averageCost: inventoryOrder.landedCostGEL,
              lastPurchasePrice: inventoryOrder.landedCostGEL,
            },
            update: {
              quantityOnHand: { increment: inventoryOrder.quantity },
              quantity: { increment: inventoryOrder.quantity },
              lastPurchasePrice: inventoryOrder.landedCostGEL,
              // Recalculate weighted average cost happens in stock-manager
            },
          }),
        ]);
      }
    }

    revalidatePath("/inventory");
    revalidatePath("/stocks");
    return { success: true, data: order };
  } catch (error) {
    console.error("Failed to update inventory order:", error);
    return { success: false, error: "Failed to update inventory order" };
  }
}

export async function getInventoryOrders(status?: InventoryOrderStatus) {
  try {
    const data = await inventoryOrderRepository.findAll(status);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get inventory orders" };
  }
}

export async function getInTransitInventory() {
  try {
    const data = await inventoryOrderRepository.findInTransit();
    const totalCapital = await inventoryOrderRepository.getInTransitCapital();
    return { success: true, data: { orders: data, totalCapital } };
  } catch (error) {
    return { success: false, error: "Failed to get in-transit inventory" };
  }
}

// ─── Marketing Campaigns ──────────────────────────────────────────────────────

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

// ─── Alerts ───────────────────────────────────────────────────────────────────

export async function runAlertChecks() {
  try {
    const count = await alertEngine.runAllChecks();
    return { success: true, data: { alertsCreated: count } };
  } catch (error) {
    return { success: false, error: "Failed to run alert checks" };
  }
}

export async function getActiveAlerts() {
  try {
    const data = await prisma.alert.findMany({
      where: { isResolved: false },
      orderBy: [{ severity: "desc" }, { createdAt: "desc" }],
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get alerts" };
  }
}

export async function resolveAlert(id: string) {
  try {
    await prisma.alert.update({
      where: { id },
      data: { isResolved: true, resolvedAt: new Date() },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to resolve alert" };
  }
}

export async function markAlertRead(id: string) {
  try {
    await prisma.alert.update({
      where: { id },
      data: { isRead: true },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to mark alert as read" };
  }
}

// ─── Weekly Snapshots & Trends ────────────────────────────────────────────────

export async function captureWeeklySnapshot() {
  try {
    await weeklySnapshotService.captureWeekSnapshot();
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to capture weekly snapshot" };
  }
}

export async function getWeeklyTrends(weeksBack: number = 12) {
  try {
    const data = await weeklySnapshotService.getWeeklyTrends(weeksBack);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get weekly trends" };
  }
}

// ─── Order follow-ups ─────────────────────────────────────────────────────────

export async function setOrderFollowUp(orderId: string, followUpAt: Date) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { followUpAt },
    });
    revalidatePath("/orders");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to set follow-up" };
  }
}

export async function getOrdersDueFollowUp() {
  try {
    const data = await prisma.order.findMany({
      where: {
        followUpAt: { lte: new Date() },
        status: { in: ["PENDING", "NO_ANSWER"] },
      },
      orderBy: { followUpAt: "asc" },
      select: {
        id: true,
        customerName: true,
        customerPhone: true,
        productTitle: true,
        followUpAt: true,
        status: true,
        notes: true,
      },
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get follow-ups" };
  }
}
