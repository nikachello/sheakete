import { ExpenseRepository } from "@/repositories/expense.repository";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import { ExpenseType } from "@prisma-client";

export interface ExpenseBreakdown {
  category: ExpenseType;
  amount: number;
  percentage: number;
  count: number;
}

export interface ExpenseTrend {
  month: string;
  total: number;
  marketing: number;
  operating: number;
}

export interface ExpenseBudgetStatus {
  category: ExpenseType;
  budgetAmount: number;
  actualAmount: number;
  remainingAmount: number;
  percentageUsed: number;
  isOverBudget: boolean;
}

export class ExpenseAnalyticsService {
  constructor(private expenseRepo: ExpenseRepository) {}

  /**
   * Get expense breakdown by category
   */
  async getExpenseBreakdown(
    month: number,
    year: number
  ): Promise<ExpenseBreakdown[]> {
    const expenses = await this.expenseRepo.findByMonth(month, year);

    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

    // Group by category
    const byCategory = expenses.reduce(
      (acc, e) => {
        if (!acc[e.type]) {
          acc[e.type] = { amount: 0, count: 0 };
        }
        acc[e.type].amount += e.amount;
        acc[e.type].count += 1;
        return acc;
      },
      {} as Record<ExpenseType, { amount: number; count: number }>
    );

    return Object.entries(byCategory).map(([category, data]) => ({
      category: category as ExpenseType,
      amount: data.amount,
      percentage: totalAmount > 0 ? (data.amount / totalAmount) * 100 : 0,
      count: data.count,
    }));
  }

  /**
   * Get expense trends for last N months
   */
  async getExpenseTrends(months: number = 6): Promise<ExpenseTrend[]> {
    const trends: ExpenseTrend[] = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const start = startOfMonth(monthDate);
      const end = endOfMonth(monthDate);

      const expenses = await this.expenseRepo.findInPeriod(start, end);

      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      const marketing = expenses
        .filter((e) => e.type === ExpenseType.MARKETING)
        .reduce((sum, e) => sum + e.amount, 0);
      const operating = total - marketing;

      trends.push({
        month: monthDate.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        total,
        marketing,
        operating,
      });
    }

    return trends;
  }

  /**
   * Calculate expense ratios
   */
  async getExpenseRatios(month: number, year: number, revenue: number) {
    const expenses = await this.expenseRepo.findByMonth(month, year);

    const marketingExpenses = expenses
      .filter((e) => e.type === ExpenseType.MARKETING)
      .reduce((sum, e) => sum + e.amount, 0);

    const operatingExpenses = expenses
      .filter((e) => e.type !== ExpenseType.MARKETING)
      .reduce((sum, e) => sum + e.amount, 0);

    const totalExpenses = marketingExpenses + operatingExpenses;

    return {
      marketingToRevenue: revenue > 0 ? (marketingExpenses / revenue) * 100 : 0,
      operatingToRevenue: revenue > 0 ? (operatingExpenses / revenue) * 100 : 0,
      totalToRevenue: revenue > 0 ? (totalExpenses / revenue) * 100 : 0,
      revenuePerMarketingDollar:
        marketingExpenses > 0 ? revenue / marketingExpenses : 0,
    };
  }
}

// Export singleton
export const expenseAnalytics = new ExpenseAnalyticsService(
  new ExpenseRepository()
);
