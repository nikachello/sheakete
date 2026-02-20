import { prisma } from "@/lib/prisma";
import { OrderStatus } from "prisma/generated/prisma/client";
import { startOfDay, endOfDay, differenceInDays } from "date-fns";

export interface ProductProfitabilityResult {
  productId: string;
  productTitle: string;
  periodDays: number;

  // Volume
  unitsSold: number;
  unitsReturned: number;
  netUnitsSold: number;

  // Revenue
  grossRevenue: number;
  returnedRevenue: number;
  netRevenue: number;

  // Costs
  averageLandedCost: number;
  cogsTotal: number;
  shippingTotal: number;
  marketingSpend: number; // attributed

  // Margins
  grossProfit: number;
  grossMargin: number; // %
  contributionProfit: number;
  contributionMargin: number; // %

  // Velocity
  dailyVelocity: number;
  weeklyVelocity: number;
  daysOfStockLeft: number | null;

  // Per unit breakdown
  perUnit: {
    revenue: number;
    landedCost: number;
    shipping: number;
    marketingAttribution: number;
    grossProfit: number;
    contributionProfit: number;
  };
}

export class ProductProfitabilityService {
  /**
   * Calculate profitability for all products in a date range.
   * Marketing spend is attributed proportionally by revenue share.
   */
  async calculateAllProducts(
    from: Date,
    to: Date
  ): Promise<ProductProfitabilityResult[]> {
    const periodDays = Math.max(1, differenceInDays(to, from) + 1);

    // Fetch all delivered orders in period
    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startOfDay(from), lte: endOfDay(to) },
        status: {
          in: [
            OrderStatus.DELIVERED,
            OrderStatus.RETURNED,
            OrderStatus.SHIPPED,
          ],
        },
        productId: { not: null },
      },
      select: {
        productId: true,
        productTitle: true,
        status: true,
        quantity: true,
        actualPaidPrice: true,
        expectedPrice: true,
        productCost: true,
        shippingFee: true,
        returnedAt: true,
      },
    });

    // Fetch total marketing spend in period
    const marketingExpenses = await prisma.expense.findMany({
      where: {
        type: "MARKETING",
        createdAt: { gte: startOfDay(from), lte: endOfDay(to) },
      },
      select: { amount: true },
    });
    const totalMarketingSpend = marketingExpenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );

    // Fetch stock for days-of-stock-left calculation
    const stocks = await prisma.stock.findMany({
      select: { productId: true, quantityOnHand: true, averageCost: true },
    });
    const stockMap = new Map(stocks.map((s) => [s.productId, s]));

    // Group orders by product
    const grouped = new Map<string, typeof orders>();
    for (const order of orders) {
      if (!order.productId) continue;
      if (!grouped.has(order.productId)) grouped.set(order.productId, []);
      grouped.get(order.productId)!.push(order);
    }

    // Calculate total revenue for marketing attribution
    let totalRevenue = 0;
    for (const [, productOrders] of grouped) {
      for (const o of productOrders) {
        if (o.status !== OrderStatus.RETURNED) {
          totalRevenue += (o.actualPaidPrice ?? o.expectedPrice) * o.quantity;
        }
      }
    }

    const results: ProductProfitabilityResult[] = [];

    for (const [productId, productOrders] of grouped) {
      const productTitle = productOrders[0].productTitle ?? "Unknown";

      let unitsSold = 0;
      let unitsReturned = 0;
      let grossRevenue = 0;
      let returnedRevenue = 0;
      let cogsTotal = 0;
      let shippingTotal = 0;

      for (const o of productOrders) {
        const price = (o.actualPaidPrice ?? o.expectedPrice) * o.quantity;
        const cogs = o.productCost * o.quantity;
        const shipping = o.shippingFee;

        if (o.status === OrderStatus.RETURNED) {
          unitsReturned += o.quantity;
          returnedRevenue += price;
          // COGS still incurred on returned items (restocking assumption)
          cogsTotal += cogs * 0.5; // assume 50% recoverable
        } else {
          unitsSold += o.quantity;
          grossRevenue += price;
          cogsTotal += cogs;
          shippingTotal += shipping;
        }
      }

      const netUnitsSold = unitsSold - unitsReturned;
      const netRevenue = grossRevenue - returnedRevenue;

      // Attribute marketing spend by this product's revenue share
      const revenueShare = totalRevenue > 0 ? netRevenue / totalRevenue : 0;
      const marketingSpend = totalMarketingSpend * revenueShare;

      const grossProfit = netRevenue - cogsTotal;
      const grossMargin = netRevenue > 0 ? (grossProfit / netRevenue) * 100 : 0;

      const contributionProfit = grossProfit - shippingTotal - marketingSpend;
      const contributionMargin =
        netRevenue > 0 ? (contributionProfit / netRevenue) * 100 : 0;

      const dailyVelocity = netUnitsSold / periodDays;
      const weeklyVelocity = dailyVelocity * 7;

      const stock = stockMap.get(productId);
      const daysOfStockLeft =
        stock && dailyVelocity > 0
          ? stock.quantityOnHand / dailyVelocity
          : null;

      const averageLandedCost =
        netUnitsSold > 0 ? cogsTotal / netUnitsSold : (stock?.averageCost ?? 0);

      results.push({
        productId,
        productTitle,
        periodDays,
        unitsSold,
        unitsReturned,
        netUnitsSold,
        grossRevenue,
        returnedRevenue,
        netRevenue,
        averageLandedCost,
        cogsTotal,
        shippingTotal,
        marketingSpend,
        grossProfit,
        grossMargin,
        contributionProfit,
        contributionMargin,
        dailyVelocity,
        weeklyVelocity,
        daysOfStockLeft,
        perUnit: {
          revenue: netUnitsSold > 0 ? netRevenue / netUnitsSold : 0,
          landedCost: averageLandedCost,
          shipping: netUnitsSold > 0 ? shippingTotal / netUnitsSold : 0,
          marketingAttribution:
            netUnitsSold > 0 ? marketingSpend / netUnitsSold : 0,
          grossProfit: netUnitsSold > 0 ? grossProfit / netUnitsSold : 0,
          contributionProfit:
            netUnitsSold > 0 ? contributionProfit / netUnitsSold : 0,
        },
      });
    }

    return results.sort((a, b) => b.contributionProfit - a.contributionProfit);
  }

  async calculateSingleProduct(
    productId: string,
    from: Date,
    to: Date
  ): Promise<ProductProfitabilityResult | null> {
    const all = await this.calculateAllProducts(from, to);
    return all.find((p) => p.productId === productId) ?? null;
  }

  /**
   * Persist a snapshot to the DB (called by a cron/scheduled job)
   */
  async saveSnapshot(from: Date, to: Date): Promise<void> {
    const results = await this.calculateAllProducts(from, to);
    const snapshotDate = new Date();

    await prisma.productProfitSnapshot.createMany({
      data: results.map((r) => ({
        snapshotDate,
        productId: r.productId,
        productTitle: r.productTitle,
        unitsSold: r.unitsSold,
        unitsReturned: r.unitsReturned,
        netUnitsSold: r.netUnitsSold,
        grossRevenue: r.grossRevenue,
        returnedRevenue: r.returnedRevenue,
        netRevenue: r.netRevenue,
        cogsTotal: r.cogsTotal,
        shippingTotal: r.shippingTotal,
        marketingSpend: r.marketingSpend,
        grossProfit: r.grossProfit,
        grossMargin: r.grossMargin,
        contributionProfit: r.contributionProfit,
        contributionMargin: r.contributionMargin,
        dailyVelocity: r.dailyVelocity,
        periodDays: r.periodDays,
      })),
    });
  }

  /**
   * Get historical snapshots for trend charts
   */
  async getProductTrends(productId: string, weeks: number = 8) {
    const since = new Date();
    since.setDate(since.getDate() - weeks * 7);

    return prisma.productProfitSnapshot.findMany({
      where: {
        productId,
        snapshotDate: { gte: since },
      },
      orderBy: { snapshotDate: "asc" },
    });
  }
}

export const productProfitabilityService = new ProductProfitabilityService();
