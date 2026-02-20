import { prisma } from "@/lib/prisma";
import {
  InventoryOrder,
  InventoryOrderStatus,
  ShippingMode,
} from "prisma/generated/prisma/client";

export interface CreateInventoryOrderInput {
  productId: string;
  productTitle: string;
  quantity: number;
  unitCostCNY: number;
  exchangeRate: number;
  shippingMode: ShippingMode;
  shippingCostGEL: number;
  orderedAt?: Date;
  expectedArrival?: Date;
  supplierName?: string;
  supplierLink?: string;
  notes?: string;
}

export class InventoryOrderRepository {
  async create(input: CreateInventoryOrderInput): Promise<InventoryOrder> {
    const unitCostGEL = input.unitCostCNY * input.exchangeRate;
    const shippingPerUnit = input.shippingCostGEL / input.quantity;
    const landedCostGEL = unitCostGEL + shippingPerUnit;
    const totalInvestment = landedCostGEL * input.quantity;

    return prisma.inventoryOrder.create({
      data: {
        productId: input.productId,
        productTitle: input.productTitle,
        quantity: input.quantity,
        unitCostCNY: input.unitCostCNY,
        exchangeRate: input.exchangeRate,
        unitCostGEL,
        shippingMode: input.shippingMode,
        shippingCostGEL: input.shippingCostGEL,
        shippingPerUnit,
        landedCostGEL,
        totalInvestment,
        status: InventoryOrderStatus.DRAFT,
        orderedAt: input.orderedAt,
        expectedArrival: input.expectedArrival,
        supplierName: input.supplierName,
        supplierLink: input.supplierLink,
        notes: input.notes,
      },
    });
  }

  async updateStatus(
    id: string,
    status: InventoryOrderStatus,
    arrivedAt?: Date
  ): Promise<InventoryOrder> {
    return prisma.inventoryOrder.update({
      where: { id },
      data: {
        status,
        arrivedAt: arrivedAt ?? (status === "ARRIVED" ? new Date() : undefined),
      },
    });
  }

  async findAll(status?: InventoryOrderStatus): Promise<InventoryOrder[]> {
    return prisma.inventoryOrder.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  async findByProduct(productId: string): Promise<InventoryOrder[]> {
    return prisma.inventoryOrder.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findInTransit(): Promise<InventoryOrder[]> {
    return prisma.inventoryOrder.findMany({
      where: {
        status: {
          in: [InventoryOrderStatus.ORDERED, InventoryOrderStatus.IN_TRANSIT],
        },
      },
      orderBy: { expectedArrival: "asc" },
    });
  }

  /**
   * Get total capital committed in in-transit orders
   */
  async getInTransitCapital(): Promise<number> {
    const result = await prisma.inventoryOrder.aggregate({
      where: {
        status: {
          in: [InventoryOrderStatus.ORDERED, InventoryOrderStatus.IN_TRANSIT],
        },
      },
      _sum: { totalInvestment: true },
    });
    return result._sum.totalInvestment ?? 0;
  }

  /**
   * Get average landed cost per unit for a product (from last N orders)
   */
  async getAverageLandedCost(
    productId: string,
    lastN: number = 3
  ): Promise<number | null> {
    const orders = await prisma.inventoryOrder.findMany({
      where: {
        productId,
        status: InventoryOrderStatus.ARRIVED,
      },
      orderBy: { arrivedAt: "desc" },
      take: lastN,
      select: { landedCostGEL: true },
    });

    if (orders.length === 0) return null;
    return orders.reduce((s, o) => s + o.landedCostGEL, 0) / orders.length;
  }
}

export const inventoryOrderRepository = new InventoryOrderRepository();
