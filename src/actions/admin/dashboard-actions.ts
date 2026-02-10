"use server";

import { OrderRepository } from "@/repositories/order.repository";
import { financialCalculator } from "@/services/financial/financial-calculator.service";
import { startOfMonth, endOfMonth } from "date-fns";

const orderRepo = new OrderRepository();

export async function getDashboardStats() {
  try {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const [monthProfit, needsAttention] = await Promise.all([
      financialCalculator.calculatePeriodFinancials(monthStart, monthEnd),
      orderRepo.findNeedsAttention(),
    ]);

    return {
      success: true,
      data: {
        monthProfit,
        needsAttention,
      },
    };
  } catch (error) {
    console.error("Failed to get dashboard stats:", error);
    return { success: false, error: "Failed to fetch dashboard data" };
  }
}
