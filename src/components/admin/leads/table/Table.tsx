"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Lead } from "@/types/leads";
import { leadColumns } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  leads: Lead[];
}

export function LeadsTable({ leads }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: leads,
    columns: leadColumns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full max-w-full space-y-4">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
            ლიდები
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            მართეთ თქვენი პოტენციური კლიენტების სია.
          </p>
        </div>

        <div className="mt-2 sm:mt-0">
          <input
            type="text"
            placeholder="ძიება..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 border border-slate-300 rounded text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full rounded-lg border border-slate-200 bg-white shadow-sm overflow-x-auto overflow-y-auto max-h-[calc(100vh-280px)]">
        <Table className="w-full min-w-[700px]">
          <TableHeader className="bg-slate-50/50 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-3 py-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group transition-colors hover:bg-slate-50/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={leadColumns.length}
                  className="h-24 text-center text-muted-foreground text-xs sm:text-sm"
                >
                  {globalFilter
                    ? "შედეგები არ მოიძებნა"
                    : "აქტიური ლიდები არ გყავთ."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-xs sm:text-sm">
        <div className="text-muted-foreground">
          გვერდი {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount() || 1} ({table.getFilteredRowModel().rows.length}{" "}
          შედეგი)
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            ««
          </button>
          <button
            className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            წინა
          </button>
          <button
            className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            შემდეგი
          </button>
          <button
            className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            »»
          </button>
        </div>
      </div>
    </div>
  );
}
