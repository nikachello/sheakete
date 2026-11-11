import { z } from "zod";
import { attributionSchema } from "@/lib/meta/shared";

export const createLeadSchema = z.object({
  submissionId: z.string().uuid(),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(9).max(30),
  productId: z.string().regex(/^[A-Za-z0-9_.-]{1,128}$/).refine((id) => !id.startsWith("drafts.")),
  optionKey: z.string().max(100).optional(),
  attribution: attributionSchema.optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
