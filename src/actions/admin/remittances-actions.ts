"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PaymentStatus } from "prisma/generated/prisma/client";

export async function getRemittances() {
  return prisma.remittance.findMany({
    include: {
      orders: {
        select: {
          id: true,
          customerName: true,
          actualPaidPrice: true,
          status: true,
        },
      },
      _count: {
        select: {
          orders: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getRemittanceById(id: string) {
  return prisma.remittance.findUnique({
    where: { id },
    include: {
      orders: {
        include: {
          //   _count: true,
        },
      },
    },
  });
}

export async function getCollectedOrders() {
  // Orders that have been delivered and payment collected but not yet settled
  return prisma.order.findMany({
    where: {
      paymentStatus: PaymentStatus.COLLECTED,
      remittanceId: null,
    },
    select: {
      id: true,
      customerName: true,
      customerPhone: true,
      productTitle: true,
      comboDetails: true,
      actualPaidPrice: true,
      cashCollected: true,
      shippingFee: true,
      additionalCosts: true,
      status: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function createRemittance(data: {
  orderIds: string[];
  bankReference?: string;
  dateReceived: Date;
  notes?: string;
}) {
  // Calculate total from selected orders
  const orders = await prisma.order.findMany({
    where: {
      id: { in: data.orderIds },
      paymentStatus: PaymentStatus.COLLECTED,
    },
    select: {
      actualPaidPrice: true,
    },
  });

  const totalAmount = orders.reduce(
    (sum, order) => sum + (order.actualPaidPrice || 0),
    0
  );

  // Create remittance and update orders
  const remittance = await prisma.remittance.create({
    data: {
      totalAmount,
      bankReference: data.bankReference || null,
      dateReceived: data.dateReceived,
      notes: data.notes || null,
      orders: {
        connect: data.orderIds.map((id) => ({ id })),
      },
    },
  });

  // Update payment status to SETTLED
  await prisma.order.updateMany({
    where: {
      id: { in: data.orderIds },
    },
    data: {
      paymentStatus: PaymentStatus.SETTLED,
    },
  });

  revalidatePath("/remittances");
  revalidatePath("/dashboard");
  revalidatePath("/orders");

  return remittance;
}

export async function deleteRemittance(id: string) {
  // First, disconnect orders and set them back to COLLECTED
  const remittance = await prisma.remittance.findUnique({
    where: { id },
    include: { orders: true },
  });

  if (remittance) {
    await prisma.order.updateMany({
      where: {
        remittanceId: id,
      },
      data: {
        remittanceId: null,
        paymentStatus: PaymentStatus.COLLECTED,
      },
    });
  }

  await prisma.remittance.delete({
    where: { id },
  });

  revalidatePath("/remittances");
  revalidatePath("/dashboard");
  revalidatePath("/orders");
}

export async function getRemittanceStats() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [thisMonth, total, pending] = await Promise.all([
    // This month's remittances
    prisma.remittance.aggregate({
      where: {
        createdAt: { gte: monthStart },
      },
      _sum: { totalAmount: true },
      _count: { id: true },
    }),

    // All time total
    prisma.remittance.aggregate({
      _sum: { totalAmount: true },
      _count: { id: true },
    }),

    // Pending collection (COLLECTED but not SETTLED)
    prisma.order.aggregate({
      where: {
        paymentStatus: PaymentStatus.COLLECTED,
      },
      _sum: { actualPaidPrice: true },
      _count: { id: true },
    }),
  ]);

  return {
    thisMonth: {
      amount: thisMonth._sum.totalAmount || 0,
      count: thisMonth._count.id,
    },
    total: {
      amount: total._sum.totalAmount || 0,
      count: total._count.id,
    },
    pending: {
      amount: pending._sum.actualPaidPrice || 0,
      count: pending._count.id,
    },
  };
}
