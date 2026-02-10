// components/orders/OrdersStatCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";

interface OrdersStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  hint?: string;
  highlight?: "default" | "warning" | "danger";
  onClick?: () => void;
}

export function OrdersStatCard({
  title,
  value,
  subtitle,
  hint,
  highlight = "default",
  onClick,
}: OrdersStatCardProps) {
  return (
    <Card
      onClick={onClick}
      className={clsx(
        "transition cursor-pointer",
        onClick && "hover:shadow-md",
        highlight === "warning" && "border-yellow-300 bg-yellow-50",
        highlight === "danger" && "border-red-300 bg-red-50"
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-600">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        <div className="text-2xl font-bold">{value}</div>

        {subtitle && <div className="text-sm text-gray-700">{subtitle}</div>}

        {hint && <div className="text-xs text-gray-500">{hint}</div>}
      </CardContent>
    </Card>
  );
}
