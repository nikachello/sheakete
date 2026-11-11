import { prisma } from "@/lib/prisma";
import { subMonths } from "date-fns";
import { OrderStatus } from "@prisma-client";

export interface ABCClassification {
  productId: string;
  productTitle: string;
  category: "A" | "B" | "C";
  revenue: number;
  revenuePercentage: number;
  cumulativePercentage: number;
  unitsSold: number;
  averagePrice: number;
}

export class ABCAnalysisService {
  // ABC Analizi produqciaze
  // A kat: top 20% produqtebis = 80% shemosavlis
  // B kat: shemdegi 30% produqtebis = 15% shemosavlis
  // C kat: bolo 50% produqtebis = 5% shemosavlis

  async performABCAnalysis(months: number = 3): Promise<ABCClassification[]> {
    const startDate = subMonths(new Date(), months);

    const orders = await prisma.order.findMany({
      where: {
        status: OrderStatus.DELIVERED,
        productId: { not: null },
        createdAt: { gte: startDate },
      },
      select: {
        productId: true,
        productTitle: true,
        quantity: true,
        actualPaidPrice: true,
        expectedPrice: true,
      },
    });

    const productStats = orders.reduce(
      (acc, order) => {
        const key = order.productId!;
        const revenue = order.actualPaidPrice ?? order.expectedPrice;

        if (!acc[key]) {
          acc[key] = {
            productId: key,
            productTitle: order.productTitle || "Unknown",
            revenue: 0,
            unitsSold: 0,
          };
        }

        acc[key].revenue += revenue;
        acc[key].unitsSold += order.quantity;

        return acc;
      },
      {} as Record<
        string,
        {
          productId: string;
          productTitle: string;
          revenue: number;
          unitsSold: number;
        }
      >
    );

    const productArray = Object.values(productStats).sort(
      (a, b) => b.revenue - a.revenue
    );

    const totalRevenue = productArray.reduce((sum, p) => sum + p.revenue, 0);
    let cumulativeRevenue = 0;
    const classifications: ABCClassification[] = productArray.map((product) => {
      cumulativeRevenue += product.revenue;
      const revenuePercentage =
        totalRevenue > 0 ? (product.revenue / totalRevenue) * 100 : 0;
      const cumulativePercentage =
        totalRevenue > 0 ? (cumulativeRevenue / totalRevenue) * 100 : 0;

      let category: "A" | "B" | "C";
      if (cumulativePercentage <= 80) {
        category = "A";
      } else if (cumulativePercentage <= 95) {
        category = "B";
      } else {
        category = "C";
      }

      return {
        productId: product.productId,
        productTitle: product.productTitle,
        category,
        revenue: product.revenue,
        revenuePercentage,
        cumulativePercentage,
        unitsSold: product.unitsSold,
        averagePrice:
          product.unitsSold > 0 ? product.revenue / product.unitsSold : 0,
      };
    });

    return classifications;
  }
}

export const ABCAnalysis = new ABCAnalysisService();
