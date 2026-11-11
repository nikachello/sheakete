"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma-client";
import { TRACKING_PREFERENCE_COOKIE, SESSION_COOKIE } from "@/lib/meta/shared";

export async function optOutOfMarketing() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  if (session && /^[0-9a-f-]{36}$/i.test(session)) {
    await prisma.$transaction(async (tx) => {
      const where = { OR: [
        { attribution: { path: ["sessionId"], equals: session } },
        { attribution: { path: ["consentSessionId"], equals: session } },
      ] };
      await tx.metaConversionEvent.updateMany({
        where: { order: where, status: "PENDING" },
        data: { status: "SUPPRESSED", payload: {}, leaseToken: null, lockedUntil: null },
      });
      await tx.order.updateMany({ where, data: { attribution: Prisma.DbNull } });
    });
  }
  cookieStore.set(TRACKING_PREFERENCE_COOKIE, "denied", { path: "/", maxAge: 90 * 86400, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  cookieStore.delete(SESSION_COOKIE);
}
