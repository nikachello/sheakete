import { prisma } from "@/lib/prisma";
import { BankReconciliation } from "@/types/financial.types";
import { BankTransactionType } from "prisma/generated/prisma/client";

export class BankReconciliationService {
  /**
   * Get current bank balance
   * ✅ FIXED: Uses only BankTransaction records
   */
  async getCurrentBankBalance(): Promise<number> {
    const [inflows, outflows] = await Promise.all([
      prisma.bankTransaction.aggregate({
        where: { type: BankTransactionType.IN },
        _sum: { amount: true },
      }),
      prisma.bankTransaction.aggregate({
        where: { type: BankTransactionType.OUT },
        _sum: { amount: true },
      }),
    ]);

    const totalIn = inflows._sum.amount || 0;
    const totalOut = outflows._sum.amount || 0;

    return totalIn - totalOut;
  }

  /**
   * Reconcile bank balance
   * Verify calculated balance matches expected
   */
  async reconcileBankBalance(): Promise<BankReconciliation> {
    const calculated = await this.getCurrentBankBalance();

    // Verify against components
    const [remittances, expenses, founderRepayments] = await Promise.all([
      prisma.bankTransaction.aggregate({
        where: { type: BankTransactionType.IN, remittanceId: { not: null } },
        _sum: { amount: true },
      }),
      prisma.bankTransaction.aggregate({
        where: { type: BankTransactionType.OUT, expenseId: { not: null } },
        _sum: { amount: true },
      }),
      prisma.bankTransaction.aggregate({
        where: {
          type: BankTransactionType.OUT,
          expenseId: null,
          remittanceId: null,
        },
        _sum: { amount: true },
      }),
    ]);

    const remittancesTotal = remittances._sum.amount || 0;
    const expensesTotal = expenses._sum.amount || 0;
    const repaymentsTotal = founderRepayments._sum.amount || 0;

    const expected = remittancesTotal - expensesTotal - repaymentsTotal;
    const discrepancy = calculated - expected;

    return {
      calculated,
      expected,
      discrepancy,
      isBalanced: Math.abs(discrepancy) < 0.01,
      breakdown: {
        remittances: remittancesTotal,
        expenses: expensesTotal,
        founderRepayments: repaymentsTotal,
      },
    };
  }

  /**
   * Get bank balance with pending collections
   */
  async getBankBalanceWithPending() {
    const [currentBalance, pendingCollections] = await Promise.all([
      this.getCurrentBankBalance(),
      prisma.order.aggregate({
        where: {
          paymentStatus: "COLLECTED",
          remittanceId: null,
        },
        _sum: { actualPaidPrice: true },
      }),
    ]);

    const pending = pendingCollections._sum.actualPaidPrice || 0;

    return {
      actualBankBalance: currentBalance,
      pendingCollections: pending,
      totalIncludingPending: currentBalance + pending,
    };
  }
}

// Export singleton
export const bankReconciliation = new BankReconciliationService();
