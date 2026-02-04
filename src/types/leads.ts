import { OrderStatus, PaymentStatus } from "generated/prisma/enums";

export interface Lead {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  customerName: string;
  customerPhone: string;
  city?: string | null;
  address?: string | null;
  productId?: string | null;
  productTitle?: string | null;
  comboDetails?: string | null;
  expectedPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  notes?: string | null;
}

export type CreateLeadInput = {
  name: string;
  phone: string;
  productTitle: string;
  comboDetails?: string;
  price: number;
  notes?: string;
  actualPaidPrice?: string;
};

export interface LeadsStats {
  activeLeads: {
    count: number;
    label: string;
  };
  conversionRate: {
    percentage: number;
    confirmed: number;
    total: number;
    label: string;
  };
  needsFollowUp: {
    count: number;
    label: string;
  };
  todayLeads: {
    count: number;
    trend: number;
    yesterdayCount: number;
    label: string;
  };
}

export interface LeadStatCard {
  id: string;
  title: string;
  value: string | number;
  description: string;
  footerText: string;
  trend: {
    value: string;
    type: "up" | "down" | "neutral";
    isPositive: boolean;
  } | null;
  icon?: string;
}

export interface StatusBreakdown {
  status: OrderStatus;
  _count: {
    id: number;
  };
}

export interface DailyLeadsData {
  date: Date;
  count: number;
}

export interface LeadsAnalytics {
  statusBreakdown: StatusBreakdown[];
  dailyLeads: DailyLeadsData[];
}
