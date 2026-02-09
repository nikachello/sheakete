"use server";

import { prisma } from "@/lib/prisma";
import { StockRepository } from "@/repositories/stock.repository";
import { stockManager } from "@/services/inventory/stock-manager.service";

const stockRepo = new StockRepository();

export async function getStockLevels() {
  try {
    // Get all stocks
    const stocks = await prisma.stock.findMany({
      orderBy: { updatedAt: "desc" },
    });

    // TODO: Merge with Sanity products to show products with 0 stock

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
