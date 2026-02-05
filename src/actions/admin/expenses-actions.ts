"use server";

import { prisma } from "@/lib/prisma";
import { ExpenseType, OrderStatus } from "prisma/generated/prisma/client";

// Fetch all expenses for a given month/year
export async function getExpensesByMonth(month: number, year: number) {
  return prisma.expense.findMany({
    where: { month, year },
    orderBy: { createdAt: "desc" },
  });
}

// Fetch stats for dashboard cards
export async function getExpenseStats(month: number, year: number) {
  const expenses = await prisma.expense.findMany({
    where: { month, year },
  });

  const orderData = await prisma.order.findMany({
    where: {
      status: OrderStatus.DELIVERED,
      updatedAt: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      },
    },
    select: {
      shippingFee: true,
      additionalCosts: true,
    },
  });

  const courierAmount = orderData.reduce(
    (sum, o) => sum + (o.shippingFee || 0),
    0
  );

  const additionalFeesTotal = orderData.reduce(
    (sum, o) => sum + (o.additionalCosts || 0),
    0
  );

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const marketingAmount = expenses
    .filter((e) => e.type === ExpenseType.MARKETING)
    .reduce((sum, e) => sum + e.amount, 0);

  return {
    totalAmount,
    marketingAmount,
    count: expenses.length,
    courierAmount,
    additionalFeesTotal,
  };
}

// Create new expense
export async function createExpense(data: {
  type: ExpenseType;
  amount: number;
  description?: string;
  reference?: string;
  month: number;
  year: number;
  isVirtual?: boolean;
}) {
  return prisma.expense.create({
    data,
  });
}
