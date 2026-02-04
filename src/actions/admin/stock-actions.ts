// actions/admin/stock-actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { StockMovementType } from "generated/prisma/enums";
import { revalidatePath } from "next/cache";
import { getProducts } from "./products-actions";
import { Product } from "@/types/product";

export async function getStockLevels() {
  const [stocks, products] = await Promise.all([
    prisma.stock.findMany({
      orderBy: { updatedAt: "desc" },
    }),
    getProducts(),
  ]);

  // Merge with Sanity products to show products with 0 stock
  const stockMap = new Map(stocks.map((s) => [s.productId, s]));

  return products.map((product: Product) => {
    const stock = stockMap.get(product._id);
    return {
      productId: product._id,
      productTitle: product.title,
      quantity: stock?.quantity || 0,
      price: product.price,
      unit: product.unit,
      updatedAt: stock?.updatedAt || null,
    };
  });
}

export async function getStockMovements(productId?: string) {
  return prisma.stockMovement.findMany({
    where: productId ? { productId } : undefined,
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
}

export async function addStock(data: {
  productId: string;
  productTitle: string;
  quantity: number;
  type: StockMovementType;
  notes?: string;
}) {
  // Create movement record
  await prisma.stockMovement.create({
    data: {
      productId: data.productId,
      productTitle: data.productTitle,
      quantity: data.quantity,
      type: data.type,
      notes: data.notes,
    },
  });

  // Update or create stock record
  await prisma.stock.upsert({
    where: { productId: data.productId },
    create: {
      productId: data.productId,
      productTitle: data.productTitle,
      quantity: data.quantity,
    },
    update: {
      quantity: { increment: data.quantity },
      productTitle: data.productTitle, // Update title in case it changed
    },
  });

  revalidatePath("/stocks");
}

export async function adjustStock(data: {
  productId: string;
  productTitle: string;
  newQuantity: number;
  notes?: string;
}) {
  const currentStock = await prisma.stock.findUnique({
    where: { productId: data.productId },
  });

  const currentQty = currentStock?.quantity || 0;
  const difference = data.newQuantity - currentQty;

  if (difference !== 0) {
    // Record the adjustment
    await prisma.stockMovement.create({
      data: {
        productId: data.productId,
        productTitle: data.productTitle,
        quantity: difference,
        type: StockMovementType.ADJUSTMENT,
        notes:
          data.notes || `Adjusted from ${currentQty} to ${data.newQuantity}`,
      },
    });

    // Update stock
    await prisma.stock.upsert({
      where: { productId: data.productId },
      create: {
        productId: data.productId,
        productTitle: data.productTitle,
        quantity: data.newQuantity,
      },
      update: {
        quantity: data.newQuantity,
        productTitle: data.productTitle,
      },
    });
  }

  revalidatePath("/stocks");
}

export async function reduceStockForOrder(
  orderId: string,
  productId: string,
  productTitle: string,
  quantity: number
) {
  // Create movement record
  await prisma.stockMovement.create({
    data: {
      productId,
      productTitle,
      quantity: -quantity, // Negative for reduction
      type: StockMovementType.SALE,
      orderId,
      notes: `Order shipped`,
    },
  });

  // Reduce stock
  await prisma.stock.update({
    where: { productId },
    data: {
      quantity: { decrement: quantity },
    },
  });

  revalidatePath("/stocks");
  revalidatePath("/orders");
}

export async function restoreStockForReturn(
  orderId: string,
  productId: string,
  productTitle: string,
  quantity: number
) {
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

  revalidatePath("/stocks");
  revalidatePath("/orders");
}

export async function getStockStats() {
  const [stocks, recentMovements, lowStock] = await Promise.all([
    prisma.stock.aggregate({
      _sum: { quantity: true },
      _count: { id: true },
    }),

    prisma.stockMovement.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
    }),

    prisma.stock.count({
      where: {
        quantity: { lte: 10 }, // Low stock threshold
      },
    }),
  ]);

  return {
    totalProducts: stocks._count.id,
    totalQuantity: stocks._sum.quantity || 0,
    recentMovements,
    lowStockCount: lowStock,
  };
}
