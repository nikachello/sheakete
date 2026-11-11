import { Prisma } from "@prisma-client";
import { enqueueConversion } from "@/lib/meta/outbox";

export async function confirmLead(
  tx: Prisma.TransactionClient,
  id: string,
  data: Prisma.OrderUpdateManyMutationInput = {},
) {
  // Compare-and-set locks the transition. Concurrent confirmations cannot create two purchases.
  const changed = await tx.order.updateMany({
    where: { id, type: "LEAD" },
    data: { ...data, type: "ORDER", status: "CONFIRMED" },
  });
  if (!changed.count) return false;
  const order = await tx.order.findUniqueOrThrow({ where: { id } });
  const occurredAt = new Date();
  await enqueueConversion(tx, order, "Purchase", occurredAt);
  return true;
}
