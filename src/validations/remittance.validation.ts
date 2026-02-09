import { z } from "zod";

export const createRemittanceSchema = z.object({
  orderIds: z.array(z.string().uuid()).min(1, "At least one order required"),
  bankReference: z.string().max(100).optional(),
  dateReceived: z.date(),
  notes: z.string().max(500).optional(),
});

export type CreateRemittanceInput = z.infer<typeof createRemittanceSchema>;
