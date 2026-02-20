import { prisma } from "@/lib/prisma";
import { subDays, startOfDay, endOfDay } from "date-fns";
import { OrderStatus, ShippingMode } from "prisma/generated/prisma/client";

export interface VelocityData {
  productId: string;
  productTitle: string;

  // Rolling windows
  velocity7d: number; // units/day over last 7 days
  velocity14d: number; // units/day over last 14 days
  velocity30d: number; // units/day over last 30 days

  // Trend signal
  trend: "accelerating" | "stable" | "decelerating" | "insufficient_data";
  trendPercent: number; // % change from 14d to 7d window

  // Stock status
  quantityOnHand: number;
  quantityInTransit: number; // from in-transit inventory orders
  daysOfStockLeft: number | null;
  daysOfStockWithTransit: number | null;

  // Saturation signals
  returnRate7d: number; // % of orders returned in last 7d
  cancellationRate7d: number;
}

export interface ReorderSignal {
  productId: string;
  productTitle: string;
  urgency: "immediate" | "soon" | "monitor" | "ok";

  currentStock: number;
  inTransit: number;
  daysOfStockLeft: number | null;

  // Recommendation
  recommendedQuantity: number;
  recommendedShippingMode: ShippingMode;
  estimatedLandedCostPerUnit: number;
  estimatedTotalCost: number;

  // Reasoning
  reason: string;
}

const SHIPPING_TRANSIT_DAYS: Record<ShippingMode, number> = {
  AIR: 7,
  LAND: 21,
  SEA: 50,
};

const SAFETY_BUFFER_DAYS = 7; // extra buffer on top of transit time

export class VelocityService {
  async getVelocityData(): Promise<VelocityData[]> {
    const stocks = await prisma.stock.findMany();
    const results: VelocityData[] = [];

    for (const stock of stocks) {
      const [v7, v14, v30, returns7, cancels7, totalOrders7] =
        await Promise.all([
          this.getVelocityForWindow(stock.productId, 7),
          this.getVelocityForWindow(stock.productId, 14),
          this.getVelocityForWindow(stock.productId, 30),
          this.getReturnCount(stock.productId, 7),
          this.getCancellationCount(stock.productId, 7),
          this.getTotalOrderCount(stock.productId, 7),
        ]);

      // Trend: compare 7d velocity vs 14d velocity
      let trend: VelocityData["trend"] = "insufficient_data";
      let trendPercent = 0;

      if (v14 > 0 && v7 > 0) {
        trendPercent = ((v7 - v14) / v14) * 100;
        if (trendPercent > 15) trend = "accelerating";
        else if (trendPercent < -15) trend = "decelerating";
        else trend = "stable";
      }

      // In-transit quantity
      const inTransitOrders = await prisma.inventoryOrder.findMany({
        where: {
          productId: stock.productId,
          status: { in: ["ORDERED", "IN_TRANSIT"] },
        },
        select: { quantity: true },
      });
      const quantityInTransit = inTransitOrders.reduce(
        (sum, o) => sum + o.quantity,
        0
      );

      const effectiveVelocity = v14 > 0 ? v14 : v7;
      const daysOfStockLeft =
        effectiveVelocity > 0 && stock.quantityOnHand > 0
          ? stock.quantityOnHand / effectiveVelocity
          : null;

      const daysOfStockWithTransit =
        effectiveVelocity > 0
          ? (stock.quantityOnHand + quantityInTransit) / effectiveVelocity
          : null;

      results.push({
        productId: stock.productId,
        productTitle: stock.productTitle,
        velocity7d: v7,
        velocity14d: v14,
        velocity30d: v30,
        trend,
        trendPercent,
        quantityOnHand: stock.quantityOnHand,
        quantityInTransit,
        daysOfStockLeft,
        daysOfStockWithTransit,
        returnRate7d: totalOrders7 > 0 ? (returns7 / totalOrders7) * 100 : 0,
        cancellationRate7d:
          totalOrders7 > 0 ? (cancels7 / totalOrders7) * 100 : 0,
      });
    }

    return results;
  }

  async getReorderSignals(): Promise<ReorderSignal[]> {
    const velocityData = await this.getVelocityData();
    const signals: ReorderSignal[] = [];

    for (const v of velocityData) {
      const effectiveVelocity =
        v.velocity14d > 0 ? v.velocity14d : v.velocity7d;
      if (effectiveVelocity === 0) continue;

      // Days needed for land shipping + buffer
      const landTransitDays = SHIPPING_TRANSIT_DAYS.LAND + SAFETY_BUFFER_DAYS;
      const airTransitDays = SHIPPING_TRANSIT_DAYS.AIR + SAFETY_BUFFER_DAYS;

      // Stock needed to cover transit
      const stockNeededForLand = effectiveVelocity * landTransitDays;
      const stockNeededForAir = effectiveVelocity * airTransitDays;

      const effectiveStock = v.quantityOnHand + v.quantityInTransit;

      let urgency: ReorderSignal["urgency"] = "ok";
      let recommendedShippingMode: ShippingMode = ShippingMode.LAND;
      let reason = "";

      if (effectiveStock <= stockNeededForAir) {
        urgency = "immediate";
        recommendedShippingMode = ShippingMode.AIR;
        reason = `Stock critically low. Only ${v.daysOfStockWithTransit?.toFixed(1)} days left including in-transit. Use Air to avoid stockout.`;
      } else if (effectiveStock <= stockNeededForLand) {
        urgency = "soon";
        recommendedShippingMode = ShippingMode.LAND;
        reason = `Stock will run out before land shipment arrives. Order now via Land.`;
      } else if (effectiveStock <= stockNeededForLand * 1.5) {
        urgency = "monitor";
        recommendedShippingMode = ShippingMode.LAND;
        reason = `Stock comfortable for now. Watch velocity and reorder if it accelerates.`;
      }

      if (urgency === "ok") continue; // don't add ok signals to list

      // Recommended quantity: 30 days of demand at current velocity
      const recommendedQuantity = Math.ceil(effectiveVelocity * 30);

      // Get last landed cost from inventory orders
      const lastInventoryOrder = await prisma.inventoryOrder.findFirst({
        where: { productId: v.productId },
        orderBy: { createdAt: "desc" },
        select: { landedCostGEL: true },
      });
      const estimatedLandedCostPerUnit = lastInventoryOrder?.landedCostGEL ?? 0;

      signals.push({
        productId: v.productId,
        productTitle: v.productTitle,
        urgency,
        currentStock: v.quantityOnHand,
        inTransit: v.quantityInTransit,
        daysOfStockLeft: v.daysOfStockWithTransit,
        recommendedQuantity,
        recommendedShippingMode,
        estimatedLandedCostPerUnit,
        estimatedTotalCost: recommendedQuantity * estimatedLandedCostPerUnit,
        reason,
      });
    }

    // Sort by urgency
    const urgencyOrder = { immediate: 0, soon: 1, monitor: 2, ok: 3 };
    return signals.sort(
      (a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
    );
  }

  /**
   * Update velocity fields on Stock records (run daily)
   */
  async updateStockVelocities(): Promise<void> {
    const stocks = await prisma.stock.findMany();

    for (const stock of stocks) {
      const velocity14d = await this.getVelocityForWindow(stock.productId, 14);
      const velocity7d = await this.getVelocityForWindow(stock.productId, 7);
      const effectiveVelocity = velocity14d > 0 ? velocity14d : velocity7d;

      await prisma.stock.update({
        where: { id: stock.id },
        data: {
          dailyVelocity: effectiveVelocity,
          weeklyVelocity: effectiveVelocity * 7,
          daysOfStockLeft:
            effectiveVelocity > 0
              ? stock.quantityOnHand / effectiveVelocity
              : null,
          lastVelocityCalc: new Date(),
        },
      });
    }
  }

  // ─── Helpers ─────────────────────────────────────────────

  private async getVelocityForWindow(
    productId: string,
    days: number
  ): Promise<number> {
    const since = subDays(new Date(), days);

    const result = await prisma.stockMovement.aggregate({
      where: {
        productId,
        type: "SALE",
        createdAt: { gte: startOfDay(since) },
      },
      _sum: { quantity: true },
    });

    const totalSold = result._sum.quantity ?? 0;
    return totalSold / days;
  }

  private async getReturnCount(
    productId: string,
    days: number
  ): Promise<number> {
    const since = subDays(new Date(), days);
    return prisma.order.count({
      where: {
        productId,
        status: OrderStatus.RETURNED,
        createdAt: { gte: startOfDay(since) },
      },
    });
  }

  private async getCancellationCount(
    productId: string,
    days: number
  ): Promise<number> {
    const since = subDays(new Date(), days);
    return prisma.order.count({
      where: {
        productId,
        status: OrderStatus.CANCELLED,
        createdAt: { gte: startOfDay(since) },
      },
    });
  }

  private async getTotalOrderCount(
    productId: string,
    days: number
  ): Promise<number> {
    const since = subDays(new Date(), days);
    return prisma.order.count({
      where: {
        productId,
        type: "ORDER",
        createdAt: { gte: startOfDay(since) },
      },
    });
  }
}

export const velocityService = new VelocityService();
