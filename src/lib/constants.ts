import { OrderStatus, PaymentStatus } from "generated/prisma/enums";

/**
 * Human-readable labels for order statuses
 * Single source of truth for status display names
 */
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "მიმდინარე",
  NO_ANSWER: "პასუხის გარეშე",
  CANCELLED: "გაუქმებული",
  CONFIRMED: "დადასტურებული",
  SHIPPED: "გაგზავნილი",
  DELIVERED: "მიწოდებული",
  RETURNED: "დაბრუნებული",
} as const;

/**
 * Human-readable labels for payment statuses
 */
export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  AWAITING_COLLECTION: "ასაღები",
  COLLECTED: "აღებული",
  SETTLED: "ჩარიცხული",
  REFUNDED: "დაბრუნებული",
} as const;

export const STAT_CARD_CONFIG = {
  PENDING_LEADS: {
    title: "ახალი ლიდები",
    description: "საჭიროა მათთან კომუნიკაცია",
    footerText: "აქტიური ლიდების რაოდენობა",
  },
  PENDING_SHIPMENT: {
    title: "გასაგზავნი შეკვეთების თანხა",
    description: "დადასტურებული გაყიდვები, რომლებიც გასაგზავნია",
    footerText: "ჯამური ღირებულება",
  },
  CASH_WITH_COURIER: {
    title: "ასაღები თანხები",
    description: "კურიერებისგან ჩასარიცხი თანხები",
    footerText: "საკურიეროსთან არსებული თანხა",
  },
  SETTLED_AMOUNT: {
    title: "თანხა ბანკში",
    description: "თანხები, რომლებიც ბანკის ანგარიშზეა",
    footerText: "ჩარიცხული თანხები",
  },
  RTO_LOSS: {
    title: "RTO დანაკარგები",
    description: "დაბრუნებული შეკვეთების ხარჯები",
    footerText: "გადაზიდვის დანაკარგები",
  },
  MONTHLY_REVENUE: {
    title: "თვიური შემოსავალი",
    description: "მიტანილი შეკვეთების თანხები",
    footerText: "შეიცავს აღებულ და ჩასარიცხ თანხებს",
  },
} as const;

export const DASHBOARD_LAYOUT = [
  "monthlyRevenue",
  "monthlyProfit",
  "cashWithCourier",
  "settledAmount",
] as const;

export const DEFAULT_CURRENCY = "GEL" as const;
