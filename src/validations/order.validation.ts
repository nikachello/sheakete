import { OrderStatus } from "prisma/generated/prisma/client";
import { z } from "zod";

export const createOrderSchema = z.object({
  customerName: z.string().min(2, "Name too short").max(100),
  customerPhone: z
    .string()
    .regex(/^\+995\d{9}$/, "Invalid Georgian phone number"),
  city: z.string().max(100).optional(),
  address: z.string().max(500).optional(),
  productId: z.string().uuid().nullable().optional(),
  productTitle: z.string().max(200).optional(),
  comboDetails: z.string().max(1000).optional(),
  expectedPrice: z.number().positive().finite(),
  quantity: z.number().int().positive().max(1000),
  productCost: z.number().nonnegative().finite(),
  shippingFee: z.number().nonnegative().finite(),
  additionalCosts: z.number().nonnegative().finite(),
  notes: z.string().max(2000).optional(),
});

export const updateOrderStatusSchema = z.object({
  orderId: z.string().uuid(),
  newStatus: z.nativeEnum(OrderStatus),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
