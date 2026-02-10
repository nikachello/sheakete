import { prisma } from "@/lib/prisma";
import { Expense, ExpenseType, Prisma } from "prisma/generated/prisma/client";

export class ExpenseRepository {
  async findInPeriod(startDate: Date, endDate: Date): Promise<Expense[]> {
    return prisma.expense.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }

  async findByMonth(month: number, year: number): Promise<Expense[]> {
    return prisma.expense.findMany({
      where: { month, year },
      include: {
        founderLoan: true,
        bankTransaction: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getTotalByType(
    type: ExpenseType,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    const result = await prisma.expense.aggregate({
      where: {
        type,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount || 0;
  }

  async create(
    data: Prisma.ExpenseCreateInput,
    tx?: Prisma.TransactionClient
  ): Promise<Expense> {
    const client = tx || prisma;
    return client.expense.create({ data });
  }
}
