"use client";

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateOrderStatus } from "@/lib/actions";
import { OrderStatus } from "generated/prisma/enums";

const columnHelper = createColumnHelper<any>();

export default function OrdersTable({ data: initialData }: { data: any[] }) {
  const [activeTab, setActiveTab] = useState("LEADS");

  // Filtering logic based on your Enum structure
  const filteredData = useMemo(() => {
    if (activeTab === "LEADS") {
      return initialData.filter((o) =>
        ["PENDING", "NO_ANSWER", "CANCELLED"].includes(o.status)
      );
    }
    return initialData.filter((o) =>
      ["CONFIRMED", "RECEIVED", "SHIPPED", "PAID"].includes(o.status)
    );
  }, [initialData, activeTab]);

  const columns = [
    columnHelper.accessor("createdAt", {
      header: "თარიღი",
      cell: (info) => (
        <span className="text-xs">
          {new Date(info.getValue()).toLocaleString("ka-GE")}
        </span>
      ),
    }),
    columnHelper.accessor("customerName", {
      header: "მომხმარებელი",
      cell: (info) => (
        <div className="flex flex-col">
          <span className="font-bold">{info.getValue()}</span>
          <span className="text-xs text-blue-600 font-mono">
            {info.row.original.customerPhone}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("status", {
      header: "სტატუსი",
      cell: (info) => {
        const currentStatus = info.getValue() as OrderStatus;
        return (
          <Select
            defaultValue={currentStatus}
            onValueChange={(val) =>
              updateOrderStatus(info.row.original.id, val as OrderStatus)
            }
          >
            <SelectTrigger className="w-[140px] h-8 text-xs font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">მოლოდინში</SelectItem>
              <SelectItem value="NO_ANSWER">არ პასუხობს</SelectItem>
              <SelectItem value="CONFIRMED">დადასტურებული</SelectItem>
              <SelectItem value="CANCELLED">გაუქმებული</SelectItem>
              <SelectItem value="PAID">გადახდილი</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    }),
    columnHelper.accessor("price", {
      header: "ფასი",
      cell: (info) => <span className="font-bold">{info.getValue()} ₾</span>,
    }),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="LEADS"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="LEADS">
            ლიდები ({initialData.filter((o) => o.status === "PENDING").length})
          </TabsTrigger>
          <TabsTrigger value="ORDERS">
            შეკვეთები (
            {
              initialData.filter((o) =>
                ["CONFIRMED", "RECEIVED", "SHIPPED", "PAID"].includes(o.status)
              ).length
            }
            )
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-slate-600 font-bold"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-slate-50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
