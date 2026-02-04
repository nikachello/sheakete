import { OrderStatus } from "prisma/generated/prisma/client";

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  CONFIRMED: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED", "RETURNED"],
  DELIVERED: ["RETURNED"],
  RETURNED: [],
  CANCELLED: [],

  // lead-only statuses (should never appear here)
  PENDING: [],
  NO_ANSWER: [],
};
