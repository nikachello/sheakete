import { prisma } from "@/lib/prisma";
import { Prisma, Remittance } from "@prisma-client";

export class RemittanceRepository {
  async findById(id: string) {
    return prisma.remittance.findUnique({
      where: { id },
      include: {
        orders: true,
        bankTransactions: true,
      },
    });
  }

  async findAll() {
    return prisma.remittance.findMany({
      include: {
        orders: {
          select: {
            id: true,
            customerName: true,
            actualPaidPrice: true,
            status: true,
          },
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(
    data: Prisma.RemittanceCreateInput,
    tx?: Prisma.TransactionClient
  ): Promise<Remittance> {
    const client = tx || prisma;
    return client.remittance.create({ data });
  }
}
