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
import { format } from "date-fns";
import { IconCalendar, IconReceipt } from "@tabler/icons-react";
import { RemittanceData } from "@/actions/admin/finance-actions";

interface RemittancesTableProps {
  remittances: RemittanceData[];
}

export function RemittancesTable({ remittances }: RemittancesTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GEL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), "MMM dd, yyyy");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">ბოლო ჩარიცხვები</CardTitle>
        <CardDescription>ჩარიცხვები საკურიეროსგან</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>რეფერენსი</TableHead>
                <TableHead>მიღების თარიგი</TableHead>
                <TableHead className="text-right">რაოდენობა</TableHead>
                <TableHead className="text-right">შეკვეთები</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {remittances.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-8"
                  >
                    ჩარიცხვები არ მოიძებნა
                  </TableCell>
                </TableRow>
              ) : (
                remittances.map((remittance) => (
                  <TableRow key={remittance.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <IconReceipt className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm">
                            {remittance.bankReference || "N/A"}
                          </span>
                        </div>
                        {remittance.notes && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {remittance.notes}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <IconCalendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {formatDate(remittance.dateReceived)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-emerald-600 tabular-nums">
                        {formatCurrency(remittance.totalAmount)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="secondary"
                        className="font-semibold tabular-nums"
                      >
                        {remittance.orderCount}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
