"use client";

import { useState } from "react";
import { ORDER_STATUS_TRANSITIONS } from "@/utils/orders/order-status";
import { updateOrderStatus } from "@/actions/admin/orders-actions";
import { OrderStatus } from "prisma/generated/prisma/client";

const statusColors: Record<OrderStatus, string> = {
  CONFIRMED: "bg-blue-500",
  SHIPPED: "bg-orange-500",
  DELIVERED: "bg-green-600",
  RETURNED: "bg-red-600",
  CANCELLED: "bg-gray-500",
  PENDING: "bg-gray-400",
  NO_ANSWER: "bg-gray-400",
};

export function EditableOrderStatusCell({
  orderId,
  value,
}: {
  orderId: string;
  value: OrderStatus;
}) {
  const [editing, setEditing] = useState(false);
  const options = ORDER_STATUS_TRANSITIONS[value] ?? [];

  if (options.length === 0) {
    return (
      <span
        className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${statusColors[value]}`}
      >
        {value}
      </span>
    );
  }

  if (editing) {
    return (
      <select
        defaultValue={value}
        autoFocus
        onChange={async (e) => {
          await updateOrderStatus(orderId, e.target.value as OrderStatus);
          setEditing(false);
        }}
        onBlur={() => setEditing(false)}
        className="px-2 py-1 text-xs sm:text-sm border rounded focus:outline-none focus:ring-1 focus:ring-slate-400"
      >
        <option value={value}>{value}</option>
        {options.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    );
  }

  return (
    <span
      onDoubleClick={() => setEditing(true)}
      onTouchStart={() => setEditing(true)}
      className={`px-2 py-1 rounded-full text-white text-xs font-semibold cursor-pointer ${statusColors[value]}`}
    >
      {value}
    </span>
  );
}
