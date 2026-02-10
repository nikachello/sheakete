"use server";

import { prisma } from "@/lib/prisma";
import { StockRepository } from "@/repositories/stock.repository";
import { stockManager } from "@/services/inventory/stock-manager.service";
import { revalidatePath } from "next/cache";
import { StockMovementType } from "prisma/generated/prisma/client";

const stockRepo = new StockRepository();

export async function getStockLevels() {
  try {
    const stocks = await prisma.stock.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return { success: true, data: stocks };
  } catch (error) {
    console.error("Failed to get stock levels:", error);
    return { success: false, error: "Failed to fetch stock" };
  }
}

export async function getLowStockAlerts() {
  try {
    const alerts = await stockManager.getLowStockAlerts();
    return { success: true, data: alerts };
  } catch (error) {
    console.error("Failed to get low stock alerts:", error);
    return { success: false, error: "Failed to fetch alerts" };
  }
}

export async function getStockMovements(productId?: string) {
  try {
    if (productId) {
      const movements = await stockRepo.findMovementsForProduct(productId);
      return { success: true, data: movements };
    }

    const movements = await prisma.stockMovement.findMany({
      include: {
        order: {
          select: {
            id: true,
            customerName: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return { success: true, data: movements };
  } catch (error) {
    console.error("Failed to get stock movements:", error);
    return { success: false, error: "Failed to fetch movements" };
  }
}

export async function addStockAction(data: {
  productId: string;
  productTitle: string;
  quantity: number;
  type: "PURCHASE" | "ADJUSTMENT";
  unitCost?: number;
  notes?: string;
}) {
  try {
    // Validate PURCHASE requires unitCost
    if (data.type === "PURCHASE" && !data.unitCost) {
      return {
        success: false,
        error: "ერთეულის ფასი აუცილებელია შესყიდვისთვის",
      };
    }

    // Validate quantity is not zero
    if (data.quantity === 0) {
      return {
        success: false,
        error: "რაოდენობა არ შეიძლება იყოს 0",
      };
    }

    // Validate PURCHASE quantity is positive
    if (data.type === "PURCHASE" && data.quantity <= 0) {
      return {
        success: false,
        error: "შესყიდვის რაოდენობა უნდა იყოს დადებითი",
      };
    }

    // Map string type to enum
    const movementType =
      data.type === "PURCHASE"
        ? StockMovementType.PURCHASE
        : StockMovementType.ADJUSTMENT;

    await stockManager.addStock({
      productId: data.productId,
      productTitle: data.productTitle,
      quantity: data.quantity,
      type: movementType,
      unitCost: data.unitCost,
      notes: data.notes,
    });

    revalidatePath("/stocks");
    return { success: true };
  } catch (error) {
    console.error("Failed to add stock:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "მარაგის დამატება ვერ მოხერხდა",
    };
  }
}
