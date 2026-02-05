"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IconTrophy, IconMedal, IconAward } from "@tabler/icons-react";
import { TopProductData } from "@/actions/admin/finance-actions";

interface TopProductsTableProps {
  products: TopProductData[];
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GEL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <IconTrophy className="h-4 w-4 text-amber-500" />;
      case 1:
        return <IconMedal className="h-4 w-4 text-gray-400" />;
      case 2:
        return <IconAward className="h-4 w-4 text-amber-700" />;
      default:
        return null;
    }
  };

  const getProfitColor = (profit: number, revenue: number) => {
    const margin = (profit / revenue) * 100;
    if (margin >= 30) return "text-emerald-600";
    if (margin >= 15) return "text-blue-600";
    if (margin >= 5) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          ყველაზე შემოსავლიანი პროდუქტები
        </CardTitle>
        <CardDescription>საუკეთესო პროდუქტები</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ადგილი</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">შემოსავალი</TableHead>
                <TableHead className="text-right">მოგება</TableHead>
                <TableHead className="text-right">შეკვეთები</TableHead>
                <TableHead className="text-right">რ-ბა</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                  >
                    არ მოიძებნა
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product, index) => {
                  const margin =
                    (product.totalProfit / product.totalRevenue) * 100;
                  return (
                    <TableRow
                      key={product.productId}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {getRankIcon(index) || (
                            <span className="text-sm font-medium text-muted-foreground">
                              {index + 1}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-sm leading-tight">
                            {product.productTitle}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            საშუალო: {formatCurrency(product.averagePrice)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold tabular-nums">
                          {formatCurrency(product.totalRevenue)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="space-y-1">
                          <p
                            className={`font-semibold tabular-nums ${getProfitColor(
                              product.totalProfit,
                              product.totalRevenue
                            )}`}
                          >
                            {formatCurrency(product.totalProfit)}
                          </p>
                          <Badge
                            variant="outline"
                            className="text-xs font-semibold tabular-nums"
                          >
                            {margin.toFixed(1)}%
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-medium tabular-nums">
                          {product.orderCount}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-medium tabular-nums">
                          {product.quantitySold}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
