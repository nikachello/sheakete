"use client";

import { RevenueBreakdownData } from "@/actions/admin/finance-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  data: RevenueBreakdownData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GEL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 text-xs"
            >
              <span style={{ color: entry.color }} className="font-medium">
                {entry.name}:
              </span>
              <span className="font-semibold">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-muted-foreground">შეკვეთა:</span>
              <span className="font-semibold">
                {payload[0]?.payload?.orders}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const averageMargin =
    totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">
              შემოსავლის და მოგების მაჩვენებელი
            </CardTitle>
            <CardDescription>ბოლო 12 თვე</CardDescription>
          </div>
          <div className="text-right space-y-1">
            <div className="text-sm font-medium text-muted-foreground">
              საშუალო მარჟა
            </div>
            <div className="text-2xl font-bold text-emerald-600">
              {averageMargin.toFixed(1)}%
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" tick={{ fontSize: 12 }} stroke="#888" />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#888"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "14px", paddingTop: "20px" }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              name="შემოსავალი"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              name="მოგება"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
