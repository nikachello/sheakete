import { OrderStatus, PaymentStatus } from "generated/prisma/enums";

export interface Lead {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  customerName: string;
  customerPhone: string;
  city?: string | null;
  address?: string | null;
  productTitle?: string | null;
  comboDetails?: string | null;
  expectedPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  notes?: string | null;
}
