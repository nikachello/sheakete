"use server";

import { prisma } from "@/lib/prisma";
import { RemittanceRepository } from "@/repositories/remittance.repository";
import { createRemittanceSchema } from "@/validations/remittance.validation";
import { revalidatePath } from "next/cache";
import {
  BankTransactionType,
  PaymentStatus,
} from "@prisma-client";

const remittanceRepo = new RemittanceRepository();

export async function createRemittance(rawData: unknown) {
  try {
    // Validate input
    const data = createRemittanceSchema.parse(rawData);

    const remittance = await prisma.$transaction(async (tx) => {
      // Validate orders are in COLLECTED status
      const orders = await tx.order.findMany({
        where: {
          id: { in: data.orderIds },
          paymentStatus: PaymentStatus.COLLECTED,
          remittanceId: null,
        },
        select: {
          id: true,
          actualPaidPrice: true,
        },
      });

      if (orders.length !== data.orderIds.length) {
        throw new Error(
          "Some orders are not in COLLECTED status or already remitted"
        );
      }

      const totalAmount = orders.reduce(
        (sum, order) => sum + (order.actualPaidPrice || 0),
        0
      );

      if (totalAmount <= 0) {
        throw new Error("Total amount must be greater than 0");
      }

      // Create remittance
      const newRemittance = await tx.remittance.create({
        data: {
          totalAmount,
          bankReference: data.bankReference || null,
          dateReceived: data.dateReceived,
          notes: data.notes || null,
        },
      });

      // ✅ CREATE BANK TRANSACTION - CRITICAL FIX!
      await tx.bankTransaction.create({
        data: {
          amount: totalAmount,
          type: BankTransactionType.IN,
          remittanceId: newRemittance.id,
          note: `Remittance received: ${data.bankReference || newRemittance.id}`,
        },
      });

      // Update orders to SETTLED
      await tx.order.updateMany({
        where: { id: { in: data.orderIds } },
        data: {
          paymentStatus: PaymentStatus.SETTLED,
          remittanceId: newRemittance.id,
        },
      });

      return newRemittance;
    });

    revalidatePath("/remittances");
    revalidatePath("/dashboard");
    revalidatePath("/finances");

    return { success: true, data: remittance };
  } catch (error) {
    console.error("Failed to create remittance:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create remittance",
    };
  }
}

export async function getRemittances() {
  try {
    const remittances = await remittanceRepo.findAll();
    return { success: true, data: remittances };
  } catch (error) {
    console.error("Failed to get remittances:", error);
    return { success: false, error: "Failed to fetch remittances" };
  }
}

export async function getCollectedOrders() {
  try {
    const orders = await prisma.order.findMany({
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

    return { success: true, data: orders };
  } catch (error) {
    console.error("Failed to get collected orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}
