"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateInventoryOrderInput,
  inventoryOrderRepository,
} from "@/repositories/invetory-order.repository";
import { revalidatePath } from "next/cache";
import { InventoryOrderStatus } from "prisma/generated/prisma/client";

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
