"use client";

import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { EditableOrderStatusCell } from "./EditableOrderStatusCell";
import { Order } from "generated/prisma/client";

/**
 * We use createColumnHelper with the Order type.
 * This ensures getValue() returns the correct type for each specific field.
 */
const columnHelper = createColumnHelper<Order>();

export const orderColumns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => (
      <span className="font-mono text-xs text-gray-600">
        {info.getValue().slice(0, 6)}
      </span>
    ),
  }),

  columnHelper.accessor("customerName", {
    header: "მოხმარებელი",
    cell: (info) => (
      <span className="text-sm font-medium">{info.getValue()}</span>
    ),
  }),

  columnHelper.accessor("customerPhone", {
    header: "ტელეფონი",
    cell: (info) => <span className="text-sm">{info.getValue()}</span>,
  }),

  columnHelper.accessor("status", {
    header: "სტატუსი",
    cell: ({ row, getValue }) => (
      <EditableOrderStatusCell orderId={row.original.id} value={getValue()} />
    ),
  }),

  columnHelper.accessor("expectedPrice", {
    header: "ფასი (საკურიეროს ჩათვლით)",
    cell: (info) => `${info.getValue()} ₾`,
  }),

  columnHelper.accessor("createdAt", {
    header: "შექმნილია",
    cell: (info) => new Date(info.getValue()).toLocaleDateString("ka-GE"),
  }),
] as ColumnDef<Order, unknown>[];
// Using 'as' here allows the array to contain mixed types (Date, string, number)
// while satisfying the ESLint rule against the raw 'any' type.
