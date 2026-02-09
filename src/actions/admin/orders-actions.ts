"use server";

import { prisma } from "@/lib/prisma";
import { OrderRepository } from "@/repositories/order.repository";
import { stockManager } from "@/services/inventory/stock-manager.service";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "@/validations/order.validation";
import { revalidatePath } from "next/cache";
import {
  OrderStatus,
  OrderType,
  PaymentStatus,
} from "prisma/generated/prisma/client";
import z from "zod";

type FieldError = {
  field: string;
  message: string;
};

const orderRepo = new OrderRepository();

export async function createOrder(rawData: unknown) {
  try {
    // Validate input with Zod
    const data = createOrderSchema.parse(rawData);

    // Execute in transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          city: data.city,
          address: data.address,
          productId: data.productId,
          productTitle: data.productTitle,
          comboDetails: data.comboDetails,
          quantity: data.quantity,
          expectedPrice: data.expectedPrice,
          productCost: data.productCost,
          shippingFee: data.shippingFee,
          additionalCosts: data.additionalCosts,
          notes: data.notes,
          type: OrderType.ORDER,
          status: OrderStatus.CONFIRMED,
          paymentStatus: PaymentStatus.AWAITING_COLLECTION,
        },
      });

      // Reserve stock if product specified - PASS THE TX CONTEXT
      if (data.productId && data.productTitle) {
        await stockManager.reserveStock(
          data.productId,
          data.productTitle,
          data.quantity,
          newOrder.id,
          tx // <-- Pass transaction context
        );
      }

      return newOrder;
    });

    revalidatePath("/orders");
    revalidatePath("/dashboard");

    return { success: true, order };
  } catch (error) {
    console.error("Failed to create order:", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const fieldErrors: FieldError[] = error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return {
        success: false,
        errors: fieldErrors,
      };
    }

    // Handle other errors
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Failed to create order",
    };
  }
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus
) {
  try {
    // Validate input
    updateOrderStatusSchema.parse({ orderId, newStatus });

    const order = await orderRepo.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.type !== OrderType.ORDER) {
      throw new Error("Cannot update status of a lead");
    }

    // Update in transaction
    await prisma.$transaction(async (tx) => {
      await tx.order.update({
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

      // Handle stock movements
      if (order.productId && order.productTitle) {
        if (newStatus === OrderStatus.SHIPPED) {
          await stockManager.shipStock(
            order.productId,
            order.productTitle,
            order.quantity,
            orderId
          );
        } else if (newStatus === OrderStatus.RETURNED) {
          await stockManager.processReturn(
            order.productId,
            order.productTitle,
            order.quantity,
            orderId
          );
        }
      }
    });

    revalidatePath("/orders");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update status",
    };
  }
}

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        type: OrderType.ORDER,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: orders };
  } catch (error) {
    console.error("Failed to get orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}

export async function getOrdersStats() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      readyToShip,
      readyToShipValue,
      inTransit,
      awaitingPayment,
      thisMonthDelivered,
    ] = await Promise.all([
      prisma.order.count({
        where: {
          type: OrderType.ORDER,
          status: OrderStatus.CONFIRMED,
        },
      }),
      prisma.order.aggregate({
        where: {
          type: OrderType.ORDER,
          status: OrderStatus.CONFIRMED,
        },
        _sum: { expectedPrice: true },
      }),
      prisma.order.count({
        where: {
          type: OrderType.ORDER,
          status: OrderStatus.SHIPPED,
        },
      }),
      prisma.order.aggregate({
        where: {
          type: OrderType.ORDER,
          paymentStatus: PaymentStatus.COLLECTED,
        },
        _sum: { actualPaidPrice: true },
        _count: { id: true },
      }),
      prisma.order.count({
        where: {
          type: OrderType.ORDER,
          status: OrderStatus.DELIVERED,
          updatedAt: { gte: monthStart },
        },
      }),
    ]);

    return {
      success: true,
      data: {
        readyToShip: {
          count: readyToShip,
          value: readyToShipValue._sum.expectedPrice || 0,
        },
        inTransit: {
          count: inTransit,
        },
        awaitingPayment: {
          amount: awaitingPayment._sum.actualPaidPrice || 0,
          count: awaitingPayment._count.id,
        },
        thisMonthDelivered,
      },
    };
  } catch (error) {
    console.error("Failed to get orders stats:", error);
    return { success: false, error: "Failed to fetch stats" };
  }
}
