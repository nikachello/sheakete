"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "generated/prisma/enums";
import { revalidatePath } from "next/cache";

export const getLeads = async () => {
  return await prisma.order.findMany({
    where: {
      type: "LEAD",
      status: {
        notIn: ["SHIPPED", "DELIVERED", "RETURNED"],
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// app/actions/leads.ts

export async function updateLead(
  id: string,
  data: Partial<{
    customerName: string;
    customerPhone: string;
    status: OrderStatus;
    expectedPrice: number;
  }>
) {
  if (typeof data.expectedPrice === "string") {
    data.expectedPrice = parseFloat(data.expectedPrice);
    if (isNaN(data.expectedPrice)) {
      data.expectedPrice = 0; // fallback
    }
  }

  await prisma.order.update({
    where: { id },
    data,
  });

  // Optional: revalidate the leads page so RSC updates
  revalidatePath("/leads");
}
