import { prisma } from "@/lib/prisma";
import { FounderLoanSummary } from "@/types/financial.types";
import {
  BankTransactionType,
  FounderLoanType,
} from "prisma/generated/prisma/client";

export class FounderLoanService {
  /**
   * Get founder loan balance
   */
  async getFounderLoanBalance(): Promise<FounderLoanSummary> {
    const [owes, repaid, unpaidLoans] = await Promise.all([
      prisma.founderLoanTransaction.aggregate({
        where: { type: FounderLoanType.COMPANY_OWES_FOUNDER },
        _sum: { amount: true },
      }),
      prisma.founderLoanTransaction.aggregate({
        where: { type: FounderLoanType.COMPANY_REPAID_FOUNDER },
        _sum: { amount: true },
      }),
      prisma.founderLoanTransaction.findMany({
        where: {
          type: FounderLoanType.COMPANY_OWES_FOUNDER,
        },
        include: {
          expense: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
    ]);

    const totalOwed = owes._sum.amount || 0;
    const totalRepaid = repaid._sum.amount || 0;
    const currentBalance = totalOwed - totalRepaid;

    const unpaidExpenses = unpaidLoans
      .filter((loan) => loan.expense)
      .map((loan) => ({
        id: loan.id,
        expenseId: loan.expenseId!,
        amount: loan.amount,
        description: loan.expense?.description || "",
        type: loan.expense?.type || "",
        createdAt: loan.createdAt,
      }));

    return {
      totalOwed,
      totalRepaid,
      currentBalance,
      unpaidExpenses,
    };
  }

  /**
   * Repay founder loan
   */
  async repayFounderLoan(amount: number, note?: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      // Create founder loan transaction
      await tx.founderLoanTransaction.create({
        data: {
          amount,
          type: FounderLoanType.COMPANY_REPAID_FOUNDER,
          note: note || "Repayment to founder",
        },
      });

      // Create bank transaction (money leaving company)
      await tx.bankTransaction.create({
        data: {
          amount,
          type: BankTransactionType.OUT,
          note: note || "Repayment to founder",
        },
      });
    });
  }
}

// Export singleton
export const founderLoanService = new FounderLoanService();
