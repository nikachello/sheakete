"use client";

import React, { useState } from "react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { Lead } from "@/types/leads";
import { updateLead } from "@/actions/admin/leads-actions";
import { OrderStatus } from "generated/prisma/enums";

const columnHelper = createColumnHelper<Lead>();

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500",
  NO_ANSWER: "bg-gray-500",
  CANCELLED: "bg-red-500",
  CONFIRMED: "bg-blue-500",
};

// EditableCell for text fields
function EditableCell({
  value: initialValue,
  rowId,
  field,
}: {
  value: string;
  rowId: string;
  field: "customerName" | "customerPhone" | "notes" | "expectedPrice";
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleSave = async () => {
    if (value !== initialValue) {
      await updateLead(rowId, { [field]: value });
    }
    setEditing(false);
  };

  return editing ? (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSave();
        if (e.key === "Escape") {
          setValue(initialValue);
          setEditing(false);
        }
      }}
      autoFocus
      className="w-full px-2 py-1 text-xs sm:text-sm border rounded focus:outline-none focus:ring-1 focus:ring-slate-400"
    />
  ) : (
    <span
      className="text-slate-700 font-medium cursor-pointer"
      onDoubleClick={() => setEditing(true)}
      onTouchStart={() => setEditing(true)}
    >
      {value || "-"}
    </span>
  );
}

// EditableStatusCell
function EditableStatusCell({
  value: initialValue,
  rowId,
}: {
  value: string;
  rowId: string;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleSave = async (newValue: string) => {
    if (newValue !== initialValue) {
      await updateLead(rowId, { status: newValue as OrderStatus });
    }
    setValue(newValue);
    setEditing(false);
  };

  const statusOptions = ["PENDING", "NO_ANSWER", "CANCELLED", "CONFIRMED"];

  if (editing) {
    return (
      <select
        value={value}
        onChange={(e) => handleSave(e.target.value)}
        onBlur={() => handleSave(value)}
        autoFocus
        className="px-2 py-1 text-xs sm:text-sm border rounded focus:outline-none focus:ring-1 focus:ring-slate-400"
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status.replace("_", " ")}
          </option>
        ))}
      </select>
    );
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-white text-xs font-semibold cursor-pointer ${
        statusColors[value] || "bg-gray-400"
      }`}
      onDoubleClick={() => setEditing(true)}
      onTouchStart={() => setEditing(true)}
    >
      {value.replace("_", " ")}
    </span>
  );
}

// Columns definition
export const leadColumns: ColumnDef<Lead, any>[] = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => (
      <span className="text-sm font-mono text-gray-700">
        {(info.getValue() as string)?.slice(0, 6) ?? "N/A"}
      </span>
    ),
  }),
  columnHelper.accessor("customerName", {
    header: "სახელი",
    cell: ({ row, getValue }) => (
      <EditableCell
        value={getValue<string>()}
        rowId={row.original.id}
        field="customerName"
      />
    ),
  }),
  columnHelper.accessor("customerPhone", {
    header: "ტელეფონი",
    cell: ({ row, getValue }) => (
      <EditableCell
        value={getValue<string>()}
        rowId={row.original.id}
        field="customerPhone"
      />
    ),
  }),
  columnHelper.accessor("status", {
    header: "სტატუსი",
    cell: ({ row, getValue }) => (
      <EditableStatusCell value={getValue<string>()} rowId={row.original.id} />
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: "შექმნილია",
    cell: (info) => {
      const date = new Date(info.getValue());
      return (
        <span className="text-sm text-gray-500">
          {!isNaN(date.getTime()) ? date.toLocaleDateString("ka-GE") : "—"}
        </span>
      );
    },
  }),
  columnHelper.accessor("productTitle", {
    header: "პროდუქტი",
    cell: (info) => {
      return <span className="text-sm text-gray-500">{info.getValue()}</span>;
    },
  }),
  columnHelper.accessor("comboDetails", {
    header: "შეთავაზება",
    cell: (info) => {
      return <span className="text-sm text-gray-500">{info.getValue()}</span>;
    },
  }),
  columnHelper.accessor("expectedPrice", {
    header: "ფასი",
    cell: ({ row, getValue }) => (
      <EditableCell
        value={getValue<string>()}
        rowId={row.original.id}
        field="expectedPrice"
      />
    ),
  }),
  columnHelper.accessor("notes", {
    header: "შენიშვნები",
    cell: ({ row, getValue }) => (
      <EditableCell
        value={getValue<string>() || ""}
        rowId={row.original.id}
        field="notes"
      />
    ),
  }),
];
