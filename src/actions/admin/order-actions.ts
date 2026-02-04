"use server";
import { prisma } from "@/lib/prisma";
import { ORDER_STATUS_TRANSITIONS } from "@/utils/orders/order-status";
import {
  OrderStatus,
  OrderType,
  PaymentStatus,
  StockMovementType,
} from "generated/prisma/enums";
import { revalidatePath } from "next/cache";

export async function createOrder(data: {
  customerName: string;
  customerPhone: string;
  city?: string;
  address?: string;
  productId?: string | null;
  productTitle?: string;
  comboDetails?: string;
  expectedPrice: number;
  quantity: number;
  productCost: number;
  shippingFee: number;
  additionalCosts: number;
  notes?: string;
}) {
  try {
    await prisma.order.create({
      data: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        city: data.city || null,
        address: data.address || null,
        productId: data.productId || null,
        productTitle: data.productTitle || null,
        comboDetails: data.comboDetails || null,
        quantity: data.quantity || 1,
        expectedPrice: data.expectedPrice,
        productCost: data.productCost,
        shippingFee: data.shippingFee,
        additionalCosts: data.additionalCosts,
        notes: data.notes || null,
        type: OrderType.ORDER,
        status: OrderStatus.CONFIRMED,
        paymentStatus: PaymentStatus.AWAITING_COLLECTION,
      },
    });

    revalidatePath("/orders");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Failed to create order:", error);
    throw new Error("შეკვეთის შექმნა ვერ მოხერხდა");
  }
}

export async function getOrdersStats() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59
  );

  const [
    readyToShip,
    readyToShipValue,
    inTransit,
    awaitingPayment,
    thisMonthDelivered,
    thisMonthReturned,
    lastMonthDelivered,
    lastMonthReturned,
    weekReturns,
    weekRtoLoss,
  ] = await Promise.all([
    // ready to ship - confirmed roders

    prisma.order.count({
      where: {
        type: OrderType.ORDER,
        status: OrderStatus.CONFIRMED,
      },
    }),

    // ready to ship value

    prisma.order.aggregate({
      where: {
        type: OrderType.ORDER,
        status: OrderStatus.CONFIRMED,
      },
      _sum: { expectedPrice: true },
    }),

    // 3. In Transit - SHIPPED orders
    prisma.order.count({
      where: {
        type: OrderType.ORDER,
        status: OrderStatus.SHIPPED,
      },
    }),

    // awaiting payments from couriers
    prisma.order.aggregate({
      where: {
        type: OrderType.ORDER,
        paymentStatus: PaymentStatus.COLLECTED,
      },
      _sum: { actualPaidPrice: true },
      _count: { id: true },
    }),

    // 5. This month delivered
    prisma.order.count({
      where: {
        type: OrderType.ORDER,
        status: OrderStatus.DELIVERED,
        updatedAt: { gte: monthStart },
      },
    }),

    // this month returned
    prisma.order.count({
      where: {
        type: OrderType.ORDER,
        status: OrderStatus.RETURNED,
        returnedAt: { gte: monthStart },
      },
    }),

    // 7. Last month delivered (for trend)
    prisma.order.count({
      where: {
        type: OrderType.ORDER,
        status: OrderStatus.DELIVERED,
        updatedAt: {
          gte: lastMonthStart,
          lte: lastMonthEnd,
        },
      },
    }),

    // 8. Last month returned (for trend)
    prisma.order.count({
      where: {
        type: OrderType.ORDER,
        status: OrderStatus.RETURNED,
        returnedAt: {
          gte: lastMonthStart,
          lte: lastMonthEnd,
        },
      },
    }),

    // 9. This week returns count
    prisma.order.count({
      where: {
        type: OrderType.ORDER,
        status: OrderStatus.RETURNED,
        returnedAt: {
          gte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),

    // 10. This week RTO loss
    prisma.order.aggregate({
      where: {
        type: OrderType.ORDER,
        status: OrderStatus.RETURNED,
        returnedAt: {
          gte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      _sum: { additionalCosts: true },
    }),
  ]);

  const thisMonthTotal = thisMonthDelivered + thisMonthReturned;
  const deliveryRate =
    thisMonthTotal > 0 ? (thisMonthDelivered / thisMonthTotal) * 100 : 0;

  const lastMonthTotal = lastMonthDelivered + lastMonthReturned;
  const lastMonthDeliveryRate =
    lastMonthTotal > 0 ? (lastMonthDelivered / lastMonthTotal) * 100 : 0;

  const deliveryRateTrend = deliveryRate - lastMonthDeliveryRate;

  // Calculate return rate
  const returnRate =
    thisMonthTotal > 0 ? (thisMonthReturned / thisMonthTotal) * 100 : 0;

  return {
    readyToShip: {
      count: readyToShip,
      value: readyToShipValue._sum.expectedPrice || 0,
      label: "გასაგზავნი შეკვეთები",
    },
    inTransit: {
      count: inTransit,
      label: "გზაში მყოფი",
    },
    awaitingPayment: {
      amount: awaitingPayment._sum.actualPaidPrice || 0,
      count: awaitingPayment._count.id,
      label: "ასაღები თანხები",
    },
    deliveryRate: {
      percentage: deliveryRate,
      delivered: thisMonthDelivered,
      total: thisMonthTotal,
      trend: deliveryRateTrend,
      label: "მიწოდების მაჩვენებელი",
    },
    weeklyReturns: {
      count: weekReturns,
      rtoLoss: weekRtoLoss._sum.additionalCosts || 0,
      returnRate: returnRate,
      label: "კვირის დაბრუნებები",
    },
  };
}

export async function getOrders() {
  return prisma.order.findMany({
    where: {
      type: OrderType.ORDER,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus
) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.type !== OrderType.ORDER) {
    throw new Error("Cannot update status of a lead");
  }

  const allowedNext = ORDER_STATUS_TRANSITIONS[order.status] || [];

  if (!allowedNext.includes(newStatus)) {
    throw new Error(
      `Invalid status transition from ${order.status} to ${newStatus}`
    );
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: newStatus,
      ...(newStatus === OrderStatus.DELIVERED && {
        paymentStatus: PaymentStatus.COLLECTED,
        cashCollected: order.expectedPrice,
        actualPaidPrice:
          order.expectedPrice -
          (order.shippingFee || 0) -
          (order.additionalCosts || 0),
      }),
      ...(newStatus === OrderStatus.RETURNED && {
        returnedAt: new Date(),
      }),
    },
  });

  if (order.productId) {
    console.log("Order: ", order, newStatus);
    if (newStatus === OrderStatus.SHIPPED) {
      await reduceStockForShipment(
        orderId,
        order.productId,
        order.productTitle || "Unknown Product",
        order.quantity || 1 // Use actual quantity from order
      );
    }

    // When order is returned, restore stock
    if (newStatus === OrderStatus.RETURNED) {
      await restoreStockForReturn(
        orderId,
        order.productId,
        order.productTitle || "Unknown Product",
        order.quantity || 1 // Use actual quantity from order
      );
    }
  }

  revalidatePath("/orders");
}

async function reduceStockForShipment(
  orderId: string,
  productId: string,
  productTitle: string,
  quantity: number
) {
  // Check if stock movement already exists for this order
  const existingMovement = await prisma.stockMovement.findFirst({
    where: {
      orderId,
      type: StockMovementType.SALE,
    },
  });

  if (existingMovement) {
    return;
  }

  // Create movement record
  await prisma.stockMovement.create({
    data: {
      productId,
      productTitle,
      quantity: -quantity,
      type: StockMovementType.SALE,
      orderId,
      notes: `Order shipped`,
    },
  });

  // Reduce stock
  const stock = await prisma.stock.findUnique({
    where: { productId },
  });

  if (stock) {
    await prisma.stock.update({
      where: { productId },
      data: {
        quantity: { decrement: quantity },
      },
    });
  } else {
    // Create stock record with negative quantity if it doesn't exist
    await prisma.stock.create({
      data: {
        productId,
        productTitle,
        quantity: -quantity,
      },
    });
  }
}

// Helper function for restoring stock
async function restoreStockForReturn(
  orderId: string,
  productId: string,
  productTitle: string,
  quantity: number
) {
  // Check if we already restored stock for this return
  const existingReturn = await prisma.stockMovement.findFirst({
    where: {
      orderId,
      type: StockMovementType.RETURN,
    },
  });

  if (existingReturn) {
    // Already restored stock for this return
    return;
  }

  // Create movement record
  await prisma.stockMovement.create({
    data: {
      productId,
      productTitle,
      quantity: quantity, // Positive for return
      type: StockMovementType.RETURN,
      orderId,
      notes: `Order returned`,
    },
  });

  // Add back to stock
  await prisma.stock.upsert({
    where: { productId },
    create: {
      productId,
      productTitle,
      quantity,
    },
    update: {
      quantity: { increment: quantity },
      productTitle,
    },
  });
}
