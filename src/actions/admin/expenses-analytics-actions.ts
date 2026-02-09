"use server";

import { expenseAnalytics } from "@/services/expenses/expense-analytics.service";

export async function getExpenseBreakdown(month: number, year: number) {
  try {
    const breakdown = await expenseAnalytics.getExpenseBreakdown(month, year);
    return { success: true, data: breakdown };
  } catch (error) {
    console.error("Failed to get expense breakdown:", error);
    return { success: false, error: "Failed to fetch breakdown" };
  }
}

export async function getExpenseTrends(months: number = 6) {
  try {
    const trends = await expenseAnalytics.getExpenseTrends(months);
    return { success: true, data: trends };
  } catch (error) {
    console.error("Failed to get expense trends:", error);
    return { success: false, error: "Failed to fetch trends" };
  }
}

export async function getExpenseRatios(
  month: number,
  year: number,
  revenue: number
) {
  try {
    const ratios = await expenseAnalytics.getExpenseRatios(
      month,
      year,
      revenue
    );
    return { success: true, data: ratios };
  } catch (error) {
    console.error("Failed to get expense ratios:", error);
    return { success: false, error: "Failed to fetch ratios" };
  }
}
