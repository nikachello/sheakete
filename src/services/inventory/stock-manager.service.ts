import { prisma } from "@/lib/prisma";
import { StockRepository } from "@/repositories/stock.repository";
import { StockAlert } from "@/types/stock.types";
import { StockMovementType, Prisma } from "prisma/generated/prisma/client";

// Type for transaction client
type TransactionClient = Omit<
  typeof prisma,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export class StockManagerService {
  constructor(private stockRepo: StockRepository) {}

  /**
   * Reserve stock when order is confirmed
   * @param tx - Optional transaction client. If provided, uses it; otherwise creates new transaction
   */
  async reserveStock(
    productId: string,
    productTitle: string,
    quantity: number,
    orderId: string,
    tx?: TransactionClient
  ): Promise<void> {
    const executeReservation = async (client: TransactionClient) => {
      // Check available stock
      const stock = await client.stock.findUnique({
        where: { productId },
      });

      const available =
        (stock?.quantityOnHand || 0) - (stock?.quantityReserved || 0);

      if (available < quantity) {
        throw new Error(
          `არასაკმარისი მარაგი. ხელმისაწვდომია: ${available}, საჭიროა: ${quantity}`
        );
      }

      // Create reservation movement
      await client.stockMovement.create({
        data: {
          productId,
          productTitle,
          quantity: -quantity,
          type: StockMovementType.RESERVATION,
          isReservation: true,
          orderId,
          notes: "Stock reserved for order",
        },
      });

      // Increase reserved quantity
      await client.stock.upsert({
        where: { productId },
        create: {
          productId,
          productTitle,
          quantityOnHand: 0,
          quantityReserved: quantity,
          quantity: 0, // Backward compatibility
        },
        update: {
          quantityReserved: { increment: quantity },
        },
      });
    };

    // If transaction provided, use it; otherwise create new transaction
    if (tx) {
      await executeReservation(tx);
    } else {
      await prisma.$transaction(executeReservation);
    }
  }

  /**
   * Ship reserved stock (convert reservation to sale)
   * @param tx - Optional transaction client
   */
  async shipStock(
    productId: string,
    productTitle: string,
    quantity: number,
    orderId: string,
    tx?: TransactionClient
  ): Promise<void> {
    const executeShipment = async (client: TransactionClient) => {
      try {
        // Create shipment movement (unique constraint prevents duplicates)
        await client.stockMovement.create({
          data: {
            productId,
            productTitle,
            quantity: -quantity,
            type: StockMovementType.SALE,
            isReservation: false,
            orderId,
            notes: "Stock shipped to customer",
          },
        });

        // Decrease on-hand, decrease reserved
        await client.stock.update({
          where: { productId },
          data: {
            quantityOnHand: { decrement: quantity },
            quantityReserved: { decrement: quantity },
            quantity: { decrement: quantity }, // Backward compatibility
          },
        });
      } catch (error: any) {
        // If unique constraint violated, movement already exists
        if (error.code === "P2002") {
          console.log(`Stock movement already exists for order ${orderId}`);
          return;
        }
        throw error;
      }
    };

    if (tx) {
      await executeShipment(tx);
    } else {
      await prisma.$transaction(executeShipment);
    }
  }

  /**
   * Process return
   * @param tx - Optional transaction client
   */
  async processReturn(
    productId: string,
    productTitle: string,
    quantity: number,
    orderId: string,
    tx?: TransactionClient
  ): Promise<void> {
    const executeReturn = async (client: TransactionClient) => {
      try {
        // Create return movement
        await client.stockMovement.create({
          data: {
            productId,
            productTitle,
            quantity: quantity,
            type: StockMovementType.RETURN,
            orderId,
            notes: "Customer return",
          },
        });

        // Add back to stock
        await client.stock.upsert({
          where: { productId },
          create: {
            productId,
            productTitle,
            quantityOnHand: quantity,
            quantityReserved: 0,
            quantity: quantity,
          },
          update: {
            quantityOnHand: { increment: quantity },
            quantity: { increment: quantity },
          },
        });
      } catch (error: any) {
        if (error.code === "P2002") {
          console.log(`Return movement already exists for order ${orderId}`);
          return;
        }
        throw error;
      }
    };

    if (tx) {
      await executeReturn(tx);
    } else {
      await prisma.$transaction(executeReturn);
    }
  }

  /**
   * Cancel reservation (return stock to available)
   * @param tx - Optional transaction client
   */
  async cancelReservation(
    productId: string,
    productTitle: string,
    quantity: number,
    orderId: string,
    tx?: TransactionClient
  ): Promise<void> {
    const executeCancellation = async (client: TransactionClient) => {
      // Create cancellation movement
      await client.stockMovement.create({
        data: {
          productId,
          productTitle,
          quantity: quantity, // Positive to add back
          type: StockMovementType.ADJUSTMENT,
          isReservation: false,
          orderId,
          notes: "Reservation cancelled",
        },
      });

      // Decrease reserved quantity
      await client.stock.update({
        where: { productId },
        data: {
          quantityReserved: { decrement: quantity },
        },
      });
    };

    if (tx) {
      await executeCancellation(tx);
    } else {
      await prisma.$transaction(executeCancellation);
    }
  }

  /**
   * Get low stock alerts with context
   */
  async getLowStockAlerts(): Promise<StockAlert[]> {
    const stocks = await this.stockRepo.findLowStock();

    const alerts = await Promise.all(
      stocks.map(async (stock) => {
        const velocity = await this.calculateSalesVelocity(stock.productId);
        const available =
          (stock.quantityOnHand || 0) - (stock.quantityReserved || 0);
        const daysUntilStockout =
          velocity > 0 ? available / velocity : Infinity;

        return {
          productId: stock.productId,
          productTitle: stock.productTitle,
          quantityOnHand: stock.quantityOnHand || 0,
          quantityReserved: stock.quantityReserved || 0,
          quantityAvailable: available,
          reorderPoint: stock.reorderPoint,
          dailySalesVelocity: velocity,
          daysUntilStockout,
          severity:
            daysUntilStockout < 1
              ? ("CRITICAL" as const)
              : daysUntilStockout < 3
                ? ("WARNING" as const)
                : ("INFO" as const),
        };
      })
    );

    return alerts.sort((a, b) => a.daysUntilStockout - b.daysUntilStockout);
  }

  /**
   * Calculate daily sales velocity
   */
  private async calculateSalesVelocity(productId: string): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const movements = await prisma.stockMovement.findMany({
      where: {
        productId,
        type: StockMovementType.SALE,
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    const totalSold = movements.reduce(
      (sum, m) => sum + Math.abs(m.quantity),
      0
    );

    return totalSold / 30; // Units per day
  }
}

// Export singleton
export const stockManager = new StockManagerService(new StockRepository());
