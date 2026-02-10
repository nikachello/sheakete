"use server";

import { prisma } from "@/lib/prisma";
import { ExpenseRepository } from "@/repositories/expense.repository";
import { founderLoanService } from "@/services/expenses/founder-loan.service";
import { createExpenseSchema } from "@/validations/expense.validation";
import { revalidatePath } from "next/cache";
import {
  BankTransactionType,
  ExpenseType,
  FounderLoanType,
} from "prisma/generated/prisma/client";

const expenseRepo = new ExpenseRepository();

export async function getExpensesByMonth(month: number, year: number) {
  try {
    const expenses = await expenseRepo.findByMonth(month, year);
    return { success: true, data: expenses };
  } catch (error) {
    console.error("Failed to get expenses:", error);
    return { success: false, error: "Failed to fetch expenses" };
  }
}

export async function getExpenseStats(month: number, year: number) {
  try {
    const expenses = await expenseRepo.findByMonth(month, year);

    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

    // Group by type
    const byType = expenses.reduce(
      (acc, e) => {
        acc[e.type] = (acc[e.type] || 0) + e.amount;
        return acc;
      },
      {} as Record<string, number>
    );

    const marketingAmount = byType[ExpenseType.MARKETING] || 0;
    const rentAmount = byType[ExpenseType.RENT] || 0;
    const softwareAmount = byType[ExpenseType.SOFTWARE] || 0;
    const salaryAmount = byType[ExpenseType.SALARY] || 0;
    const logisticsAmount = byType[ExpenseType.LOGISTICS] || 0;
    const taxAmount = byType[ExpenseType.TAX] || 0;
    const otherAmount = byType[ExpenseType.OTHER] || 0;

    return {
      success: true,
      data: {
        totalAmount,
        marketingAmount,
        rentAmount,
        softwareAmount,
        salaryAmount,
        logisticsAmount,
        taxAmount,
        otherAmount,
        count: expenses.length,
        byType,
      },
    };
  } catch (error) {
    console.error("Failed to get expense stats:", error);
    return { success: false, error: "Failed to fetch stats" };
  }
}

export async function createExpense(rawData: unknown) {
  try {
    // Validate input
    const data = createExpenseSchema.parse(rawData);

    if (data.amount < 0) {
      throw new Error("თანხა უნდა იყოს 0-ზე მეტი");
    }

    const expense = await prisma.$transaction(async (tx) => {
      // Create expense
      const newExpense = await tx.expense.create({
        data: {
          type: data.type,
          amount: data.amount,
          description: data.description,
          reference: data.reference,
          month: data.month,
          year: data.year,
          isVirtual: data.isVirtual,
          paidFromBank: data.payer === "company",
        },
      });

      if (data.payer === "company") {
        // Company paid - create bank transaction
        await tx.bankTransaction.create({
          data: {
            amount: data.amount,
            type: BankTransactionType.OUT,
            expenseId: newExpense.id,
            note: "ხარჯი გადაიხადა კომპანიამ",
          },
        });
      }

      if (data.payer === "founder") {
        // Founder paid - create founder loan
        await tx.founderLoanTransaction.create({
          data: {
            amount: data.amount,
            type: FounderLoanType.COMPANY_OWES_FOUNDER,
            expenseId: newExpense.id,
            note: "ხარჯი გადაიხადა დამფუძნებელმა",
          },
        });
      }

      return newExpense;
    });

    revalidatePath("/expenses");
    revalidatePath("/finances");

    return { success: true, data: expense };
  } catch (error) {
    console.error("Failed to create expense:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create expense",
    };
  }
}

export async function getFounderLoanBalance() {
  try {
    const balance = await founderLoanService.getFounderLoanBalance();
    return { success: true, data: balance };
  } catch (error) {
    console.error("Failed to get founder loan balance:", error);
    return { success: false, error: "Failed to get balance" };
  }
}

export async function repayFounderLoan(amount: number, note?: string) {
  try {
    await founderLoanService.repayFounderLoan(amount, note);

    revalidatePath("/expenses");
    revalidatePath("/finances");

    return { success: true };
  } catch (error) {
    console.error("Failed to repay founder loan:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to repay loan",
    };
  }
}
