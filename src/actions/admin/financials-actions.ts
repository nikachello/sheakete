"use server";

import { bankReconciliation } from "@/services/financial/bank-reconciliation.service";
import { financialCalculator } from "@/services/financial/financial-calculator.service";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export async function getCurrentMonthProfit() {
  try {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    const data = await financialCalculator.calculatePeriodFinancials(
      start,
      end
    );

    return { success: true, data };
  } catch (error) {
    console.error("Failed to get current month profit:", error);
    return { success: false, error: "Failed to calculate profit" };
  }
}

export async function getFinancialsData() {
  try {
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);
    const previousMonthStart = startOfMonth(subMonths(now, 1));
    const previousMonthEnd = endOfMonth(subMonths(now, 1));

    const [current, previous, bankBalance, bankWithPending] = await Promise.all(
      [
        financialCalculator.calculatePeriodFinancials(
          currentMonthStart,
          currentMonthEnd
        ),
        financialCalculator.calculatePeriodFinancials(
          previousMonthStart,
          previousMonthEnd
        ),
        bankReconciliation.getCurrentBankBalance(),
        bankReconciliation.getBankBalanceWithPending(),
      ]
    );

    return {
      success: true,
      data: {
        current,
        previous,
        bankBalance,
        bankWithPending,
      },
    };
  } catch (error) {
    console.error("Failed to get financials data:", error);
    return { success: false, error: "Failed to fetch financials" };
  }
}

export async function getCurrentBankBalance() {
  try {
    const balance = await bankReconciliation.getCurrentBankBalance();
    return { success: true, data: balance };
  } catch (error) {
    console.error("Failed to get bank balance:", error);
    return { success: false, error: "Failed to get balance" };
  }
}

export async function reconcileBankBalance() {
  try {
    const reconciliation = await bankReconciliation.reconcileBankBalance();
    return { success: true, data: reconciliation };
  } catch (error) {
    console.error("Failed to reconcile bank balance:", error);
    return { success: false, error: "Failed to reconcile" };
  }
}
