import { prisma } from "@/lib/prisma";
import { OrderStatus } from "generated/prisma/enums";

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
      shippingFee: true,
      additionalCosts: true,
    },
  });

  let totalRevenue = 0;
  let totalCosts = 0;

  deliveredOrders.forEach((order) => {
    totalRevenue += order.actualPaidPrice || 0;

    totalCosts +=
      (order.productCost || 0) +
      (order.shippingFee || 0) +
      (order.additionalCosts || 0);
  });

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
