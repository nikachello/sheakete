import { prisma } from "@/lib/prisma";
import { AlertSeverity, AlertType } from "prisma/generated/prisma/client";
import { subWeeks, startOfDay } from "date-fns";
import { cashFlowProjectionService } from "../financial/cash-flow-procetion.service";
import { velocityService } from "../inventory/velocity.service";

/**
 * AlertEngine runs checks across the business and creates Alert records.
 * Call runAllChecks() from a daily cron job or on-demand.
 */
export class AlertEngine {
  async runAllChecks(): Promise<number> {
    let created = 0;

    created += await this.checkLowStock();
    created += await this.checkCashRunway();
    created += await this.checkReturnRateSpike();
    created += await this.checkVelocityChanges();
    created += await this.checkReorderSignals();

    return created;
  }

  // ─── Check: Low Stock ──────────────────────────────────────────────────────

  private async checkLowStock(): Promise<number> {
    const velocities = await velocityService.getVelocityData();
    let count = 0;

    for (const v of velocities) {
      if (v.daysOfStockLeft === null) continue;

      let severity: AlertSeverity | null = null;
      let message = "";

      if (v.daysOfStockLeft <= 3) {
        severity = AlertSeverity.CRITICAL;
        message = `Only ${v.daysOfStockLeft.toFixed(1)} days of stock remaining. Immediate reorder required.`;
      } else if (v.daysOfStockLeft <= 7) {
        severity = AlertSeverity.WARNING;
        message = `${v.daysOfStockLeft.toFixed(1)} days of stock remaining. Plan reorder now.`;
      }

      if (!severity) continue;

      const alreadyExists = await prisma.alert.findFirst({
        where: {
          productId: v.productId,
          type: AlertType.LOW_STOCK,
          isResolved: false,
          createdAt: { gte: startOfDay(new Date()) },
        },
      });

      if (!alreadyExists) {
        await prisma.alert.create({
          data: {
            type: AlertType.LOW_STOCK,
            severity,
            title: `Low Stock: ${v.productTitle}`,
            message,
            productId: v.productId,
            productTitle: v.productTitle,
            data: {
              daysOfStockLeft: v.daysOfStockLeft,
              quantityOnHand: v.quantityOnHand,
              quantityInTransit: v.quantityInTransit,
              dailyVelocity: v.velocity14d,
            },
          },
        });
        count++;
      }
    }

    return count;
  }

  // ─── Check: Cash Runway ────────────────────────────────────────────────────

  private async checkCashRunway(): Promise<number> {
    const forecast = await cashFlowProjectionService.getForecast(30);

    if (forecast.summary.lowestBalance < 150) {
      const alreadyExists = await prisma.alert.findFirst({
        where: {
          type: AlertType.CASH_RUNWAY,
          isResolved: false,
          createdAt: { gte: startOfDay(new Date()) },
        },
      });

      if (!alreadyExists) {
        await prisma.alert.create({
          data: {
            type: AlertType.CASH_RUNWAY,
            severity:
              forecast.summary.lowestBalance < 0
                ? AlertSeverity.CRITICAL
                : AlertSeverity.WARNING,
            title: "Cash Flow Warning",
            message: `Projected balance drops to ${forecast.summary.lowestBalance.toFixed(2)} GEL on ${forecast.summary.lowestBalanceDate.toLocaleDateString()}. Review inventory commitments and pending expenses.`,
            data: {
              currentBalance: forecast.currentBankBalance,
              lowestBalance: forecast.summary.lowestBalance,
              lowestBalanceDate: forecast.summary.lowestBalanceDate,
              runwayDays: forecast.summary.runwayDays,
            },
          },
        });
        return 1;
      }
    }

    return 0;
  }

  // ─── Check: Return Rate Spike ──────────────────────────────────────────────

  private async checkReturnRateSpike(): Promise<number> {
    const velocities = await velocityService.getVelocityData();
    let count = 0;

    const RETURN_RATE_THRESHOLD = 15; // % — alert if above this

    for (const v of velocities) {
      if (v.returnRate7d < RETURN_RATE_THRESHOLD) continue;

      const alreadyExists = await prisma.alert.findFirst({
        where: {
          productId: v.productId,
          type: AlertType.RETURN_RATE_SPIKE,
          isResolved: false,
          createdAt: { gte: startOfDay(new Date()) },
        },
      });

      if (!alreadyExists) {
        await prisma.alert.create({
          data: {
            type: AlertType.RETURN_RATE_SPIKE,
            severity:
              v.returnRate7d > 25
                ? AlertSeverity.CRITICAL
                : AlertSeverity.WARNING,
            title: `High Return Rate: ${v.productTitle}`,
            message: `Return rate is ${v.returnRate7d.toFixed(1)}% in the last 7 days. Investigate product quality or listing accuracy.`,
            productId: v.productId,
            productTitle: v.productTitle,
            data: {
              returnRate7d: v.returnRate7d,
              cancellationRate7d: v.cancellationRate7d,
            },
          },
        });
        count++;
      }
    }

    return count;
  }

  // ─── Check: Velocity Changes (saturation signal) ───────────────────────────

  private async checkVelocityChanges(): Promise<number> {
    const velocities = await velocityService.getVelocityData();
    let count = 0;

    for (const v of velocities) {
      if (v.trend !== "decelerating" || Math.abs(v.trendPercent) < 30) continue;

      const alreadyExists = await prisma.alert.findFirst({
        where: {
          productId: v.productId,
          type: AlertType.VELOCITY_CHANGE,
          isResolved: false,
          createdAt: { gte: subWeeks(new Date(), 1) }, // once per week max
        },
      });

      if (!alreadyExists) {
        await prisma.alert.create({
          data: {
            type: AlertType.VELOCITY_CHANGE,
            severity: AlertSeverity.WARNING,
            title: `Sales Slowing: ${v.productTitle}`,
            message: `Sales velocity dropped ${Math.abs(v.trendPercent).toFixed(0)}% vs last 2 weeks. Consider rotating ad creatives or reducing reorder quantity.`,
            productId: v.productId,
            productTitle: v.productTitle,
            data: {
              velocity7d: v.velocity7d,
              velocity14d: v.velocity14d,
              trendPercent: v.trendPercent,
            },
          },
        });
        count++;
      }
    }

    return count;
  }

  // ─── Check: Reorder Signals ────────────────────────────────────────────────

  private async checkReorderSignals(): Promise<number> {
    const signals = await velocityService.getReorderSignals();
    let count = 0;

    for (const signal of signals) {
      if (signal.urgency !== "immediate" && signal.urgency !== "soon") continue;

      const alreadyExists = await prisma.alert.findFirst({
        where: {
          productId: signal.productId,
          type: AlertType.REORDER_SIGNAL,
          isResolved: false,
          createdAt: { gte: startOfDay(new Date()) },
        },
      });

      if (!alreadyExists) {
        await prisma.alert.create({
          data: {
            type: AlertType.REORDER_SIGNAL,
            severity:
              signal.urgency === "immediate"
                ? AlertSeverity.CRITICAL
                : AlertSeverity.WARNING,
            title: `Reorder Now: ${signal.productTitle}`,
            message: signal.reason,
            productId: signal.productId,
            productTitle: signal.productTitle,
            data: {
              urgency: signal.urgency,
              currentStock: signal.currentStock,
              inTransit: signal.inTransit,
              daysOfStockLeft: signal.daysOfStockLeft,
              recommendedQuantity: signal.recommendedQuantity,
              recommendedShippingMode: signal.recommendedShippingMode,
              estimatedTotalCost: signal.estimatedTotalCost,
            },
          },
        });
        count++;
      }
    }

    return count;
  }
}

export const alertEngine = new AlertEngine();
