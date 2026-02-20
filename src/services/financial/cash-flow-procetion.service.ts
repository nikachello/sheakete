import { prisma } from "@/lib/prisma";
import { addDays, startOfDay, endOfDay } from "date-fns";
import {
  OrderStatus,
  PaymentStatus,
  InventoryOrderStatus,
} from "prisma/generated/prisma/client";

export interface DailyProjection {
  date: Date;
  openingBalance: number;
  inflows: {
    pendingRemittances: number;
    confirmedOrderValue: number;
    total: number;
  };
  outflows: {
    scheduledExpenses: number;
    inventoryCommitments: number;
    total: number;
  };
  closingBalance: number;
  warningLevel: "safe" | "caution" | "danger"; // based on closing balance thresholds
}

export interface CashFlowForecast {
  currentBankBalance: number;
  founderLoanBalance: number; // company owes founders
  projections: DailyProjection[];
  summary: {
    lowestBalance: number;
    lowestBalanceDate: Date;
    runwayDays: number; // days until balance hits 0
    totalExpectedInflows: number;
    totalExpectedOutflows: number;
  };
}

export class CashFlowProjectionService {
  private readonly SAFE_THRESHOLD = 500; // GEL — caution below this
  private readonly DANGER_THRESHOLD = 150; // GEL — danger below this

  async getForecast(daysAhead: number = 60): Promise<CashFlowForecast> {
    // Current bank balance
    const bankTxns = await prisma.bankTransaction.findMany({
      select: { amount: true, type: true },
    });
    const currentBankBalance = bankTxns.reduce(
      (sum, t) => sum + (t.type === "IN" ? t.amount : -t.amount),
      0
    );

    // Founder loan balance
    const founderLoans = await prisma.founderLoanTransaction.findMany({
      select: { amount: true, type: true },
    });
    const founderLoanBalance = founderLoans.reduce(
      (sum, t) =>
        sum + (t.type === "COMPANY_OWES_FOUNDER" ? t.amount : -t.amount),
      0
    );

    // Pending remittances (cash in delivery pipelines not yet in bank)
    const pendingRemittanceOrders = await prisma.order.findMany({
      where: {
        status: OrderStatus.DELIVERED,
        paymentStatus: {
          in: [PaymentStatus.AWAITING_COLLECTION, PaymentStatus.COLLECTED],
        },
        remittanceId: null,
      },
      select: { expectedPrice: true, actualPaidPrice: true, quantity: true },
    });
    const pendingRemittanceTotal = pendingRemittanceOrders.reduce(
      (sum, o) => sum + (o.actualPaidPrice ?? o.expectedPrice) * o.quantity,
      0
    );

    // Confirmed orders not yet shipped (revenue coming soon)
    const confirmedOrders = await prisma.order.findMany({
      where: {
        status: { in: [OrderStatus.CONFIRMED, OrderStatus.SHIPPED] },
      },
      select: { expectedPrice: true, actualPaidPrice: true, quantity: true },
    });
    const confirmedOrderValue = confirmedOrders.reduce(
      (sum, o) => sum + (o.actualPaidPrice ?? o.expectedPrice) * o.quantity,
      0
    );

    // In-transit inventory (committed cash outflows)
    const inTransitInventory = await prisma.inventoryOrder.findMany({
      where: {
        status: {
          in: [InventoryOrderStatus.ORDERED, InventoryOrderStatus.IN_TRANSIT],
        },
      },
      select: { totalInvestment: true, expectedArrival: true },
    });

    // Build day-by-day projections
    const projections: DailyProjection[] = [];
    let runningBalance = currentBankBalance;
    let lowestBalance = currentBankBalance;
    let lowestBalanceDate = new Date();
    let runwayDays = daysAhead;

    const today = startOfDay(new Date());

    // Spread pending remittances over next 7 days (estimated)
    const dailyRemittance = pendingRemittanceTotal / 7;
    // Spread confirmed order value over next 14 days
    const dailyConfirmedInflow = confirmedOrderValue / 14;

    for (let i = 0; i < daysAhead; i++) {
      const date = addDays(today, i);
      const openingBalance = runningBalance;

      // Inflows
      const remittanceInflow = i < 7 ? dailyRemittance : 0;
      const orderInflow = i < 14 ? dailyConfirmedInflow : 0;

      // Outflows — inventory orders due around their expected arrival
      const inventoryOutflow = inTransitInventory
        .filter((inv) => {
          if (!inv.expectedArrival) return false;
          const arrivalDay = startOfDay(inv.expectedArrival);
          const projDay = startOfDay(date);
          return arrivalDay.getTime() === projDay.getTime();
        })
        .reduce((sum, inv) => sum + inv.totalInvestment, 0);

      const totalInflows = remittanceInflow + orderInflow;
      const totalOutflows = inventoryOutflow;

      runningBalance = openingBalance + totalInflows - totalOutflows;

      if (runningBalance < lowestBalance) {
        lowestBalance = runningBalance;
        lowestBalanceDate = date;
      }

      if (runningBalance <= 0 && runwayDays === daysAhead) {
        runwayDays = i;
      }

      const warningLevel =
        runningBalance < this.DANGER_THRESHOLD
          ? "danger"
          : runningBalance < this.SAFE_THRESHOLD
            ? "caution"
            : "safe";

      projections.push({
        date,
        openingBalance,
        inflows: {
          pendingRemittances: remittanceInflow,
          confirmedOrderValue: orderInflow,
          total: totalInflows,
        },
        outflows: {
          scheduledExpenses: 0, // future: pull from recurring expense model
          inventoryCommitments: inventoryOutflow,
          total: totalOutflows,
        },
        closingBalance: runningBalance,
        warningLevel,
      });
    }

    return {
      currentBankBalance,
      founderLoanBalance,
      projections,
      summary: {
        lowestBalance,
        lowestBalanceDate,
        runwayDays,
        totalExpectedInflows: pendingRemittanceTotal + confirmedOrderValue,
        totalExpectedOutflows: inTransitInventory.reduce(
          (sum, i) => sum + i.totalInvestment,
          0
        ),
      },
    };
  }

  /**
   * Save a snapshot of today's projection to DB
   */
  async saveProjectionSnapshot(): Promise<void> {
    const forecast = await this.getForecast(1);
    const today = forecast.projections[0];
    if (!today) return;

    await prisma.cashFlowProjection.create({
      data: {
        projectionDate: today.date,
        openingBalance: today.openingBalance,
        expectedInflows: today.inflows.total,
        expectedOutflows: today.outflows.total,
        projectedBalance: today.closingBalance,
        pendingRemittances: today.inflows.pendingRemittances,
        confirmedOrderValue: today.inflows.confirmedOrderValue,
        scheduledExpenses: today.outflows.scheduledExpenses,
        inventoryCommitments: today.outflows.inventoryCommitments,
      },
    });
  }
}

export const cashFlowProjectionService = new CashFlowProjectionService();
