"use client";

import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { EditableOrderStatusCell } from "./EditableOrderStatusCell";
import { Order } from "generated/prisma/client";

const columnHelper = createColumnHelper<Order>();

export const orderColumns: ColumnDef<Order, any>[] = [
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
];
