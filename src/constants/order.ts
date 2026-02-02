import { OrderStatus, PaymentStatus } from "generated/prisma/enums";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "მიმდინარე",
  NO_ANSWER: "პასუხის გარეშე",
  CANCELLED: "გაუქმებული",
  CONFIRMED: "დადასტურებული",
  SHIPPED: "გაგზავნილი",
  DELIVERED: "მიწოდებული",
  RETURNED: "დაბრუნებული",
} as const;

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  AWAITING_COLLECTION: "ასაღები",
  COLLECTED: "აღებული",
  SETTLED: "ჩარიცხული",
  REFUNDED: "დაბრუნებული",
} as const;
