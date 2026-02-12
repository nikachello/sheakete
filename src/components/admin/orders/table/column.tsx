"use client";

import { createColumnHelper, ColumnDef, FilterFn } from "@tanstack/react-table";
import { EditableOrderStatusCell } from "./EditableOrderStatusCell";
import {
  Order,
  OrderStatus,
  PaymentStatus,
} from "prisma/generated/prisma/client";

type EnrichedOrder = Order & {
  profit: number;
  revenue: number;
};

const columnHelper = createColumnHelper<EnrichedOrder>();

const dateRangeFilter: FilterFn<EnrichedOrder> = (
  row,
  columnId,
  filterValue
) => {
  const date = new Date(row.getValue(columnId));
  const [start, end] = filterValue as [Date | undefined, Date | undefined];

  if (!start && !end) return true;
  if (start && !end) return date >= start;
  if (!start && end) return date <= end;
  return date >= start! && date <= end!;
};

// Minimal status badge - Shopify style
const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const styles: Record<OrderStatus, string> = {
    CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
    SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
    DELIVERED: "bg-green-50 text-green-700 border-green-200",
    RETURNED: "bg-red-50 text-red-700 border-red-200",
    CANCELLED: "bg-gray-50 text-gray-700 border-gray-200",
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
    NO_ANSWER: "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

// Minimal payment status badge
const PaymentStatusBadge = ({ status }: { status: PaymentStatus }) => {
  const styles: Record<PaymentStatus, string> = {
    AWAITING_COLLECTION: "bg-yellow-50 text-yellow-700 border-yellow-200",
    COLLECTED: "bg-green-50 text-green-700 border-green-200",
    REFUNDED: "bg-red-50 text-red-700 border-red-200",
    SETTLED: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export const orderColumnsEnhanced = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => (
      <span className="font-mono text-xs text-gray-500" title={info.getValue()}>
        {info.getValue().slice(0, 8)}
      </span>
    ),
    enableSorting: false,
    size: 100,
  }),

  columnHelper.accessor("createdAt", {
    header: "თარიღი",
    cell: (info) => {
      const date = new Date(info.getValue());
      return (
        <div className="text-sm">
          <div className="text-gray-900">
            {date.toLocaleDateString("ka-GE")}
          </div>
          <div className="text-xs text-gray-500">
            {date.toLocaleTimeString("ka-GE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      );
    },
    filterFn: dateRangeFilter,
    enableColumnFilter: true,
    sortingFn: "datetime",
    size: 130,
  }),

  columnHelper.accessor("customerName", {
    header: "მოხმარებელი",
    cell: (info) => (
      <span className="text-sm font-medium text-gray-900">
        {info.getValue()}
      </span>
    ),
    enableSorting: true,
    size: 150,
  }),

  columnHelper.accessor("customerPhone", {
    header: "ტელეფონი",
    cell: (info) => (
      <a
        href={`tel:${info.getValue()}`}
        className="text-sm text-gray-900 hover:text-gray-600"
      >
        {info.getValue()}
      </a>
    ),
    enableSorting: false,
    size: 130,
  }),

  columnHelper.accessor("productTitle", {
    header: "პროდუქტი",
    cell: (info) => (
      <span className="text-sm text-gray-900">{info.getValue() || "-"}</span>
    ),
    enableSorting: true,
    size: 200,
  }),

  columnHelper.accessor("quantity", {
    header: "რაოდენობა",
    cell: (info) => (
      <span className="text-sm font-medium text-gray-900">
        {info.getValue()}
      </span>
    ),
    enableSorting: true,
    size: 100,
  }),

  columnHelper.accessor("city", {
    header: "ქალაქი",
    cell: (info) => (
      <span className="text-sm text-gray-900">{info.getValue() || "-"}</span>
    ),
    enableColumnFilter: true,
    enableSorting: true,
    size: 120,
  }),

  columnHelper.accessor("address", {
    header: "მისამართი",
    cell: (info) => (
      <span className="text-sm text-gray-500">{info.getValue() || "-"}</span>
    ),
    enableSorting: false,
    size: 200,
  }),

  columnHelper.accessor("status", {
    header: "სტატუსი",
    cell: ({ row, getValue }) => (
      <EditableOrderStatusCell orderId={row.original.id} value={getValue()} />
    ),
    enableColumnFilter: true,
    enableSorting: true,
    size: 130,
  }),

  columnHelper.accessor("paymentStatus", {
    header: "გადახდა",
    cell: (info) => <PaymentStatusBadge status={info.getValue()} />,
    enableColumnFilter: true,
    enableSorting: true,
    size: 150,
  }),

  columnHelper.accessor("type", {
    header: "ტიპი",
    cell: (info) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${
          info.getValue() === "ORDER"
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-gray-50 text-gray-700 border-gray-200"
        }`}
      >
        {info.getValue()}
      </span>
    ),
    enableColumnFilter: true,
    enableSorting: true,
    size: 100,
  }),

  columnHelper.accessor("expectedPrice", {
    header: "მოსალოდნელი ფასი",
    cell: (info) => (
      <span className="text-sm font-medium text-gray-900">
        {info.getValue().toFixed(2)} ₾
      </span>
    ),
    enableSorting: true,
    size: 130,
  }),

  columnHelper.accessor("revenue", {
    header: "შემოსავალი",
    cell: (info) => {
      const value = info.getValue();
      return (
        <span
          className={`text-sm font-medium ${value > 0 ? "text-gray-900" : "text-gray-400"}`}
        >
          {value.toFixed(2)} ₾
        </span>
      );
    },
    enableSorting: true,
    size: 130,
  }),

  columnHelper.accessor("productCost", {
    header: "პროდუქტის ღირებულება",
    cell: (info) => (
      <span className="text-sm text-gray-900">
        {info.getValue().toFixed(2)} ₾
      </span>
    ),
    enableSorting: true,
    size: 150,
  }),

  columnHelper.accessor("shippingFee", {
    header: "მიწოდება",
    cell: (info) => (
      <span className="text-sm text-gray-900">
        {info.getValue().toFixed(2)} ₾
      </span>
    ),
    enableSorting: true,
    size: 110,
  }),

  columnHelper.accessor("profit", {
    header: "მოგება",
    cell: (info) => {
      const profit = info.getValue();
      const row = info.row.original;
      const margin = row.revenue > 0 ? (profit / row.revenue) * 100 : 0;

      return (
        <div className="text-sm">
          <div
            className={`font-semibold ${profit > 0 ? "text-gray-900" : "text-red-600"}`}
          >
            {profit.toFixed(2)} ₾
          </div>
          {row.revenue > 0 && (
            <div className="text-xs text-gray-500">{margin.toFixed(1)}%</div>
          )}
        </div>
      );
    },
    enableSorting: true,
    sortingFn: "basic",
    size: 120,
  }),

  columnHelper.accessor("cashCollected", {
    header: "შეგროვებული თანხა",
    cell: (info) => {
      const value = info.getValue();
      return (
        <span className="text-sm text-gray-900">
          {value ? `${value.toFixed(2)} ₾` : "-"}
        </span>
      );
    },
    enableSorting: true,
    size: 150,
  }),

  columnHelper.accessor("actualPaidPrice", {
    header: "რეალური ფასი",
    cell: (info) => {
      const value = info.getValue();
      return (
        <span className="text-sm text-gray-900">
          {value ? `${value.toFixed(2)} ₾` : "-"}
        </span>
      );
    },
    enableSorting: true,
    size: 130,
  }),

  columnHelper.accessor("additionalCosts", {
    header: "დამატებითი ხარჯები",
    cell: (info) => {
      const value = info.getValue();
      return (
        <span className="text-sm text-gray-900">
          {value > 0 ? `${value.toFixed(2)} ₾` : "-"}
        </span>
      );
    },
    enableSorting: true,
    size: 150,
  }),

  columnHelper.accessor("notes", {
    header: "შენიშვნები",
    cell: (info) => {
      const notes = info.getValue();
      return notes ? (
        <span
          className="text-sm text-gray-500 truncate max-w-[200px] block"
          title={notes}
        >
          {notes}
        </span>
      ) : (
        <span className="text-gray-400">-</span>
      );
    },
    enableSorting: false,
    size: 200,
  }),

  columnHelper.accessor("returnedAt", {
    header: "დაბრუნების თარიღი",
    cell: (info) => {
      const date = info.getValue();
      return date ? (
        <span className="text-sm text-gray-900">
          {new Date(date).toLocaleDateString("ka-GE")}
        </span>
      ) : (
        <span className="text-gray-400">-</span>
      );
    },
    filterFn: dateRangeFilter,
    enableSorting: true,
    size: 150,
  }),

  columnHelper.accessor("remittanceId", {
    header: "გადარიცხვა",
    cell: (info) => {
      const id = info.getValue();
      return id ? (
        <span className="font-mono text-xs text-gray-500" title={id}>
          {id.slice(0, 8)}
        </span>
      ) : (
        <span className="text-gray-400">-</span>
      );
    },
    enableSorting: false,
    size: 110,
  }),
] as ColumnDef<EnrichedOrder, unknown>[];
