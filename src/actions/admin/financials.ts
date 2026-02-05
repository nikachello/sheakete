import { prisma } from "@/lib/prisma";
import { OrderStatus } from "prisma/generated/prisma/client";

export const revalidate = 0;

export async function getCurrentMonthProfit() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const deliveredOrders = await prisma.order.findMany({
    where: {
      status: OrderStatus.DELIVERED,
      updatedAt: { gte: startOfMonth },
    },
    select: {
      actualPaidPrice: true,
      productCost: true,
      quantity: true,
      shippingFee: true,
      additionalCosts: true,
    },
  });

  let totalRevenue = 0;
  let totalCosts = 0;

  for (const order of deliveredOrders) {
    const revenue = order.actualPaidPrice ?? 0;
    const costPerUnit = order.productCost ?? 0;
    const quantity = order.quantity ?? 1;

    totalRevenue += revenue;
    totalCosts +=
      costPerUnit * quantity + order.shippingFee + order.additionalCosts;
  }

  const grossProfit = totalRevenue - totalCosts;
  const profitMargin =
    totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  return {
    revenue: totalRevenue,
    costs: totalCosts,
    profit: grossProfit,
    margin: profitMargin,
    orderCount: deliveredOrders.length,
  };
}
