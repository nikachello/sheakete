// components/remittances/remittances-table.tsx
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { Eye, Trash2 } from "lucide-react";
import { deleteRemittance } from "@/actions/admin/remittances-actions";
import Link from "next/link";

type Remittance = {
  id: string;
  createdAt: Date;
  totalAmount: number;
  bankReference: string | null;
  dateReceived: Date;
  notes: string | null;
  _count: {
    orders: number;
  };
};

export function RemittancesTable({
  remittances,
}: {
  remittances: Remittance[];
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteRemittance(id);
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("წაშლა ვერ მოხერხდა");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>თარიღი</TableHead>
            <TableHead>მიღების თარიღი</TableHead>
            <TableHead>რეფერენსი</TableHead>
            <TableHead>შეკვეთები</TableHead>
            <TableHead>თანხა</TableHead>
            <TableHead className="text-right">მოქმედებები</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {remittances.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                გადარიცხვები არ მოიძებნა
              </TableCell>
            </TableRow>
          ) : (
            remittances.map((remittance) => (
              <TableRow key={remittance.id}>
                <TableCell>
                  {format(new Date(remittance.createdAt), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(remittance.dateReceived), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {remittance.bankReference || (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {remittance._count.orders} შეკვეთა
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold">
                  {remittance.totalAmount.toFixed(2)} ₾
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/remittances/${remittance.id}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={deletingId === remittance.id}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>დარწმუნებული ხართ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          გადარიცხვის წაშლის შემდეგ, შეკვეთები დაბრუნდება
                          "ასაღები" სტატუსში.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>გაუქმება</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(remittance.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          წაშლა
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
