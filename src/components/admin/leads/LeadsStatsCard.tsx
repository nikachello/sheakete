"use client";

import {
  IconTrendingDown,
  IconTrendingUp,
  IconMinus,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LeadStatCard } from "@/types/leads";

interface LeadsStatsCardsProps {
  cards: LeadStatCard[];
  className?: string;
}

/**
 * Displays stat cards for the leads dashboard
 */
export function LeadsStatsCards({ cards, className }: LeadsStatsCardsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
        className
      )}
    >
      {cards.map((card) => {
        const TrendIcon =
          card.trend?.type === "up"
            ? IconTrendingUp
            : card.trend?.type === "down"
              ? IconTrendingDown
              : IconMinus;

        const badgeClassName = card.trend
          ? cn(
              "flex items-center gap-1 px-1.5 py-0.5",
              card.trend.type === "up" &&
                "text-emerald-600 border-emerald-100 bg-emerald-50",
              card.trend.type === "down" &&
                "text-rose-600 border-rose-100 bg-rose-50",
              card.trend.type === "neutral" &&
                "text-zinc-600 border-zinc-100 bg-zinc-50"
            )
          : "";

        const footerIconClassName = card.trend
          ? cn(
              "size-4",
              card.trend.type === "up" && "text-emerald-500",
              card.trend.type === "down" && "text-rose-500",
              card.trend.type === "neutral" && "text-zinc-500"
            )
          : "size-4 text-zinc-500";

        return (
          <Card
            key={card.id}
            className="bg-gradient-to-t from-zinc-50 to-white shadow-sm border-zinc-200"
          >
            <CardHeader className="space-y-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider flex items-center gap-2">
                {card.icon && <span className="text-lg">{card.icon}</span>}
                {card.title}
              </CardDescription>

              <div className="flex items-end justify-between">
                <CardTitle className="text-2xl font-bold tabular-nums">
                  {card.value}
                </CardTitle>

                {card.trend && (
                  <Badge variant="outline" className={badgeClassName}>
                    <TrendIcon size={12} stroke={3} />
                    <span className="text-[11px] font-bold">
                      {card.trend.value}
                    </span>
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1 border-t border-zinc-100 pt-4 mt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                {card.footerText}
                {card.trend && <TrendIcon className={footerIconClassName} />}
              </div>
              <p className="text-xs text-zinc-500">{card.description}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
