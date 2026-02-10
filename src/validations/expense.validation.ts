import { ExpenseType } from "prisma/generated/prisma/client";
import { z } from "zod";

export const createExpenseSchema = z.object({
  type: z.nativeEnum(ExpenseType),
  amount: z.number().positive().finite(),
  description: z.string().max(500).optional(),
  reference: z.string().max(100).optional(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(2100),
  isVirtual: z.boolean().default(false),
  payer: z.enum(["company", "founder"]),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
