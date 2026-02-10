import { prisma } from "@/lib/prisma";
import { Order, OrderStatus, Prisma } from "prisma/generated/prisma/client";

export class OrderRepository {
  async findById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
    });
  }

  async findDeliveredInPeriod(
    startDate: Date,
    endDate: Date
  ): Promise<
    Array<{
      actualPaidPrice: number | null;
      expectedPrice: number;
      productCost: number;
      quantity: number;
      shippingFee: number;
      additionalCosts: number;
    }>
  > {
    return prisma.order.findMany({
      where: {
        status: OrderStatus.DELIVERED,
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        actualPaidPrice: true,
        expectedPrice: true,
        productCost: true,
        quantity: true,
        shippingFee: true,
        additionalCosts: true,
      },
    });
  }

  async findNeedsAttention(): Promise<Order[]> {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    return prisma.order.findMany({
      where: {
        OR: [
          // Confirmed but not shipped > 24h
          {
            status: OrderStatus.CONFIRMED,
            updatedAt: { lt: twentyFourHoursAgo },
          },
          // Delivered but not settled > 48h
          {
            status: OrderStatus.DELIVERED,
            paymentStatus: "COLLECTED",
            updatedAt: { lt: fortyEightHoursAgo },
          },
          // Returned orders
          {
            status: OrderStatus.RETURNED,
          },
        ],
      },
      orderBy: { updatedAt: "asc" },
      take: 20,
    });
  }

  async create(
    data: Prisma.OrderCreateInput,
    tx?: Prisma.TransactionClient
  ): Promise<Order> {
    const client = tx || prisma;
    return client.order.create({ data });
  }

  async update(
    id: string,
    data: Prisma.OrderUpdateInput,
    tx?: Prisma.TransactionClient
  ): Promise<Order> {
    const client = tx || prisma;
    return client.order.update({
      where: { id },
      data,
    });
  }
}
