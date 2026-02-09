import { prisma } from "@/lib/prisma";
import { Stock, StockMovement } from "prisma/generated/prisma/client";

export class StockRepository {
  async findByProductId(productId: string): Promise<Stock | null> {
    return prisma.stock.findUnique({
      where: { productId },
    });
  }

  async getAvailableQuantity(productId: string): Promise<number> {
    const stock = await this.findByProductId(productId);
    if (!stock) return 0;
    return (stock.quantityOnHand || 0) - (stock.quantityReserved || 0);
  }

  async findLowStock(threshold: number = 10): Promise<Stock[]> {
    return prisma.stock.findMany({
      where: {
        OR: [
          {
            quantityOnHand: { lte: threshold },
          },
        ],
      },
      orderBy: { quantityOnHand: "asc" },
    });
  }

  async findMovementsForProduct(
    productId: string,
    limit: number = 30
  ): Promise<StockMovement[]> {
    return prisma.stockMovement.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}
