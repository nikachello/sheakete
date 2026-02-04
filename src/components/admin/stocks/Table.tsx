// components/stocks/stocks-table.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { AdjustStockDialog } from "./AdjustStockDialog";

type Stock = {
  productId: string;
  productTitle: string;
  quantity: number;
  price: number;
  unit: string | undefined;
  updatedAt: Date | null;
};

export function StocksTable({ stocks }: { stocks: Stock[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>პროდუქტი</TableHead>
            <TableHead>რაოდენობა</TableHead>
            <TableHead>ფასი</TableHead>
            <TableHead>ღირებულება</TableHead>
            <TableHead>ბოლო განახლება</TableHead>
            <TableHead className="text-right">მოქმედებები</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                მარაგები არ მოიძებნა
              </TableCell>
            </TableRow>
          ) : (
            stocks.map((stock) => (
              <TableRow key={stock.productId}>
                <TableCell className="font-medium">
                  {stock.productTitle}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{stock.quantity}</span>
                    {stock.unit && (
                      <span className="text-xs text-muted-foreground">
                        {stock.unit}
                      </span>
                    )}
                    {stock.quantity <= 10 && stock.quantity > 0 && (
                      <Badge variant="outline" className="text-orange-500">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        დაბალია
                      </Badge>
                    )}
                    {stock.quantity === 0 && (
                      <Badge variant="destructive">ამოწურულია</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{stock.price.toFixed(2)} ₾</TableCell>
                <TableCell className="font-semibold">
                  {(stock.quantity * stock.price).toFixed(2)} ₾
                </TableCell>
                <TableCell>
                  {stock.updatedAt
                    ? format(new Date(stock.updatedAt), "dd/MM/yyyy HH:mm")
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <AdjustStockDialog
                    productId={stock.productId}
                    productTitle={stock.productTitle}
                    currentQuantity={stock.quantity}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
