"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  IconChartPie,
  IconTruck,
  IconPackage,
  IconCoins,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface ProfitMetrics {
  grossProfit: number;
  profitMargin: number;
  deliveredOrdersProfit: number;
  deliveredOrdersMargin: number;
}

interface CostBreakdown {
  totalProductCosts: number;
  totalShippingFees: number;
  totalAdditionalCosts: number;
  totalCosts: number;
}

interface ProfitMarginCardProps {
  data: ProfitMetrics;
}

export function ProfitMarginCard({ data }: ProfitMarginCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GEL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const metrics = [
    {
      label: "მოგების მარჟა",
      value: `${data.profitMargin.toFixed(1)}%`,
      amount: formatCurrency(data.grossProfit),
      description: "ყველა შეკვეთაზე",
      progress: data.profitMargin,
      icon: IconChartPie,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      progressColor: "bg-emerald-500",
    },
    {
      label: "მიტანილი შეკვეთების მარჟა",
      value: `${data.deliveredOrdersMargin.toFixed(1)}%`,
      amount: formatCurrency(data.deliveredOrdersProfit),
      description: "დასრულებული შეკვეთებიდან",
      progress: data.deliveredOrdersMargin,
      icon: IconTruck,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      progressColor: "bg-blue-500",
    },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">მოგების ანალიზი</CardTitle>
        <CardDescription>მარჟის და მოგების ჩაშლა</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="space-y-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="text-3xl font-bold tabular-nums">
                      {metric.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {metric.description}
                    </p>
                  </div>
                  <div className={cn("p-3 rounded-lg", metric.bgColor)}>
                    <Icon className={cn("h-6 w-6", metric.color)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">მოგება</span>
                    <span className="font-semibold">{metric.amount}</span>
                  </div>
                  <Progress
                    value={Math.min(metric.progress, 100)}
                    className="h-2"
                    // indicatorClassName={metric.progressColor}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
