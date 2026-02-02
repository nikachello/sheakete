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
import { StatCard } from "@/types/dashboard";

interface DataCardProps {
  stats: StatCard[];
  className?: string;
}

/**
 * DataCard Component
 * Displays a grid of statistic cards with optional trend indicators
 *
 * @param stats - Array of stat cards to display
 * @param className - Optional additional CSS classes
 */
export function DataCard({ stats, className }: DataCardProps) {
  return (
    <div
      className={cn(
        // Responsive grid: 1 col mobile, 2 cols tablet, 4 cols desktop
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
        className
      )}
    >
      {stats.map((stat) => {
        // Determine which icon to show based on trend type
        const TrendIcon =
          stat.trend?.type === "up"
            ? IconTrendingUp
            : stat.trend?.type === "down"
              ? IconTrendingDown
              : IconMinus;

        // Determine badge styling based on trend
        const badgeClassName = stat.trend
          ? cn(
              "flex items-center gap-1 px-1.5 py-0.5",
              stat.trend.type === "up" &&
                "text-emerald-600 border-emerald-100 bg-emerald-50",
              stat.trend.type === "down" &&
                "text-rose-600 border-rose-100 bg-rose-50",
              stat.trend.type === "neutral" &&
                "text-zinc-600 border-zinc-100 bg-zinc-50"
            )
          : "";

        // Determine footer icon color
        const footerIconClassName = stat.trend
          ? cn(
              "size-4",
              stat.trend.type === "up" && "text-emerald-500",
              stat.trend.type === "down" && "text-rose-500",
              stat.trend.type === "neutral" && "text-zinc-500"
            )
          : "size-4 text-zinc-500";

        return (
          <Card
            key={stat.id}
            className="bg-gradient-to-t from-zinc-50 to-white shadow-sm border-zinc-200"
          >
            <CardHeader className="space-y-2">
              {/* Card title - stat name */}
              <CardDescription className="text-xs font-medium uppercase tracking-wider">
                {stat.title}
              </CardDescription>

              {/* Main value and trend badge */}
              <div className="flex items-end justify-between">
                <CardTitle className="text-2xl font-bold tabular-nums">
                  {stat.value}
                </CardTitle>

                {/* Show trend badge only if trend data exists */}
                {stat.trend && (
                  <Badge variant="outline" className={badgeClassName}>
                    <TrendIcon size={12} stroke={3} />
                    <span className="text-[11px] font-bold">
                      {stat.trend.value}
                    </span>
                  </Badge>
                )}
              </div>
            </CardHeader>

            {/* Footer with description */}
            <CardFooter className="flex-col items-start gap-1 border-t border-zinc-100 pt-4 mt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
                {stat.footerText}
                {stat.trend && <TrendIcon className={footerIconClassName} />}
              </div>
              <p className="text-xs text-zinc-500">{stat.description}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
