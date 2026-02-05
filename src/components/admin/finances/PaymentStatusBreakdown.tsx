"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PaymentBreakdown {
  status: string;
  amount: number;
  count: number;
  percentage: number;
}

interface PaymentStatusBreakdownProps {
  data: PaymentBreakdown[];
}

const statusConfig: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  AWAITING_COLLECTION: {
    label: "კურიერმა უნდა აიღოს",
    color: "text-amber-700",
    bgColor: "bg-amber-500",
  },
  COLLECTED: {
    label: "კურიერმა აიღო",
    color: "text-blue-700",
    bgColor: "bg-blue-500",
  },
  SETTLED: {
    label: "ჩარიცხულია",
    color: "text-emerald-700",
    bgColor: "bg-emerald-500",
  },
  REFUNDED: {
    label: "დაბრუნებულია",
    color: "text-rose-700",
    bgColor: "bg-rose-500",
  },
};

export function PaymentStatusBreakdown({ data }: PaymentStatusBreakdownProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GEL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const sortedData = [...data].sort((a, b) => b.amount - a.amount);

  return (
    <Card className="shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-lg">გადახდის სტატუსი</CardTitle>
        <CardDescription>თანხები გადახდის სტატუსის მიხედვით</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {sortedData.map((item) => {
          const config = statusConfig[item.status] || {
            label: item.status,
            color: "text-gray-700",
            bgColor: "bg-gray-500",
          };

          return (
            <div key={item.status} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className={cn("text-sm font-semibold", config.color)}>
                    {config.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.count} {item.count === 1 ? "შეკვეთა" : "შეკვეთა"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold tabular-nums">
                    {formatCurrency(item.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
              <Progress
                value={item.percentage}
                className="h-2"
                // indicatorClassName={config.bgColor}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
