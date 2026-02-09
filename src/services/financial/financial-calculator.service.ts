import { ExpenseRepository } from "@/repositories/expense.repository";
import { OrderRepository } from "@/repositories/order.repository";
import { OrderFinancials, PeriodFinancials } from "@/types/financial.types";
import { ExpenseType } from "prisma/generated/prisma/client";

export class FinancialCalculatorService {
  constructor(
    private orderRepo: OrderRepository,
    private expenseRepo: ExpenseRepository
  ) {}

  /**
   * Calculate financials for a single order
   * ✅ SINGLE SOURCE OF TRUTH for order calculations
   */
  calculateOrderFinancials(order: {
    actualPaidPrice: number | null;
    expectedPrice: number;
    productCost: number;
    quantity: number;
    shippingFee: number;
    additionalCosts: number;
  }): OrderFinancials {
    const revenue = order.actualPaidPrice ?? order.expectedPrice;
    const productCost = order.productCost * order.quantity;
    const shippingFee = order.shippingFee;
    const additionalCosts = order.additionalCosts;
    const cogs = productCost + shippingFee + additionalCosts;
    const grossProfit = revenue - cogs;

    return {
      revenue,
      cogs,
      productCost,
      shippingFee,
      additionalCosts,
      grossProfit,
      grossMargin: revenue > 0 ? (grossProfit / revenue) * 100 : 0,
    };
  }

  /**
   * Calculate period financials
   * ✅ SINGLE SOURCE OF TRUTH for period calculations
   */
  async calculatePeriodFinancials(
    startDate: Date,
    endDate: Date
  ): Promise<PeriodFinancials> {
    // Get delivered orders
    const orders = await this.orderRepo.findDeliveredInPeriod(
      startDate,
      endDate
    );

    // Aggregate order financials using consistent calculator
    const orderTotals = orders.reduce(
      (acc, order) => {
        const calc = this.calculateOrderFinancials(order);
        return {
          revenue: acc.revenue + calc.revenue,
          cogs: acc.cogs + calc.cogs,
          grossProfit: acc.grossProfit + calc.grossProfit,
        };
      },
      { revenue: 0, cogs: 0, grossProfit: 0 }
    );

    // Get expenses (NOT including shipping/additional from orders)
    const expenses = await this.expenseRepo.findInPeriod(startDate, endDate);

    const marketingExpenses = expenses
      .filter((e) => e.type === ExpenseType.MARKETING)
      .reduce((sum, e) => sum + e.amount, 0);

    const operatingExpenses = expenses
      .filter((e) => e.type !== ExpenseType.MARKETING)
      .reduce((sum, e) => sum + e.amount, 0);

    const totalOpEx = marketingExpenses + operatingExpenses;
    const netProfit = orderTotals.grossProfit - totalOpEx;

    return {
      totalRevenue: orderTotals.revenue,
      totalCOGS: orderTotals.cogs,
      grossProfit: orderTotals.grossProfit,
      grossMargin:
        orderTotals.revenue > 0
          ? (orderTotals.grossProfit / orderTotals.revenue) * 100
          : 0,
      marketingExpenses,
      operatingExpenses,
      totalOpEx,
      netProfit,
      netMargin:
        orderTotals.revenue > 0 ? (netProfit / orderTotals.revenue) * 100 : 0,
      roas: marketingExpenses > 0 ? orderTotals.revenue / marketingExpenses : 0,
      orderCount: orders.length,
      averageOrderValue:
        orders.length > 0 ? orderTotals.revenue / orders.length : 0,
    };
  }
}

// Export singleton instance
export const financialCalculator = new FinancialCalculatorService(
  new OrderRepository(),
  new ExpenseRepository()
);
