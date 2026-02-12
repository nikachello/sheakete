"use client";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { orderColumns } from "./column";
import { Order } from "prisma/generated/prisma/client";

export function OrdersTable({ orders }: { orders: Order[] }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10, // 🔴 THIS was missing
  });

  const table = useReactTable({
    data: orders,
    columns: orderColumns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg border bg-white overflow-auto max-h-[70vh]">
        <Table className="min-w-[700px]">
          <TableHeader className="sticky top-0 bg-slate-50 z-10">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
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

      {/* Pagination */}
      <div className="flex justify-between items-center text-xs">
        <span>
          გვერდი {pagination.pageIndex + 1} / {table.getPageCount()}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            className="cursor-pointer"
            disabled={!table.getCanPreviousPage()}
          >
            წინა
          </button>
          <button
            onClick={() => table.nextPage()}
            className="cursor-pointer"
            disabled={!table.getCanNextPage()}
          >
            შემდეგი
          </button>
        </div>
      </div>
    </div>
  );
}
