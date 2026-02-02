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
