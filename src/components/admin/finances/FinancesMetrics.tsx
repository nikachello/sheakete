"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconCash,
  IconShoppingCart,
  IconChartLine,
  IconPercentage,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { FinancialsData } from "@/actions/admin/finance-actions";

interface FinancialsMetricsProps {
  data: FinancialsData;
}

export function FinancialsMetrics({ data }: FinancialsMetricsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GEL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  const metrics = [
    {
      id: "total-revenue",
      title: "მთლიანი შემოსავალი",
      value: formatCurrency(data.totalRevenue),
      description: "მთლიანი შემოსავალი ყველა შეკვეთიდან",
      icon: IconCash,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      trend: {
        value: formatPercentage(data.monthComparison.growth.revenueGrowth),
        type:
          data.monthComparison.growth.revenueGrowth > 0
            ? "up"
            : data.monthComparison.growth.revenueGrowth < 0
              ? "down"
              : "neutral",
      },
      footer: "წინა თვესთან შედარებით",
    },
    {
      id: "total-profit",
      title: "მთლიანი მოგება",
      value: formatCurrency(data.totalProfit),
      description: `${data.profitMetrics.profitMargin.toFixed(1)}% მარჟა`,
      icon: IconChartLine,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      trend: {
        value: formatPercentage(data.monthComparison.growth.profitGrowth),
        type:
          data.monthComparison.growth.profitGrowth > 0
            ? "up"
            : data.monthComparison.growth.profitGrowth < 0
              ? "down"
              : "neutral",
      },
      footer: "წინა თვესთან შედარებით",
    },
    {
      id: "net-profit",
      title: "სუფთა მოგება",
      value: formatCurrency(data.netProfit),
      description: `${data.profitMetrics.netProfitMargin.toFixed(1)}% მარჟა`,
      icon: IconChartLine,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      // trend: {
      //   value: formatPercentage(data.monthComparison.growth.profitGrowth),
      //   type:
      //     data.monthComparison.growth.profitGrowth > 0
      //       ? "up"
      //       : data.monthComparison.growth.profitGrowth < 0
      //         ? "down"
      //         : "neutral",
      // },
      footer: "გამოკლებულია მარკეტინგის ხარჯი",
    },
    {
      id: "total-orders",
      title: "ყველა შეკვეთა",
      value: data.totalOrders.toLocaleString(),
      description: "დასრულებული შეკვეთები",
      icon: IconShoppingCart,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      trend: {
        value: formatPercentage(data.monthComparison.growth.ordersGrowth),
        type:
          data.monthComparison.growth.ordersGrowth > 0
            ? "up"
            : data.monthComparison.growth.ordersGrowth < 0
              ? "down"
              : "neutral",
      },
      footer: "წინა თვესთან შედარებით",
    },
    {
      id: "avg-order-value",
      title: "შეკვეთის საშუალო თანხა",
      value: formatCurrency(data.averageOrderValue),
      description: "ყველა დასრულებულ შეკვეთაზე",
      icon: IconPercentage,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
      trend: null,
      footer: "საშუალო თანხა",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon =
          metric.trend?.type === "up"
            ? IconTrendingUp
            : metric.trend?.type === "down"
              ? IconTrendingDown
              : IconMinus;

        const badgeClassName = metric.trend
          ? cn(
              "flex items-center gap-1 px-2 py-0.5",
              metric.trend.type === "up" &&
                "text-emerald-700 border-emerald-200 bg-emerald-50",
              metric.trend.type === "down" &&
                "text-rose-700 border-rose-200 bg-rose-50",
              metric.trend.type === "neutral" &&
                "text-zinc-700 border-zinc-200 bg-zinc-50"
            )
          : "";

        return (
          <Card
            key={metric.id}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="text-xs font-medium uppercase tracking-wide">
                  {metric.title}
                </CardDescription>
                <div className={cn("p-2 rounded-lg", metric.iconBg)}>
                  <Icon className={cn("h-4 w-4", metric.iconColor)} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-end justify-between">
                <CardTitle className="text-3xl font-bold tabular-nums">
                  {metric.value}
                </CardTitle>
                {metric.trend && (
                  <Badge variant="outline" className={badgeClassName}>
                    <TrendIcon size={12} stroke={2.5} />
                    <span className="text-xs font-semibold">
                      {metric.trend.value}
                    </span>
                  </Badge>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  {metric.footer}
                </p>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
