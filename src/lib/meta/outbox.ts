import { randomUUID } from "node:crypto";
import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma, type PrismaClient } from "@prisma-client";
import { buildConversion, eventExpired, retryAt, type ConversionName, type ConversionOrder } from "./payload";
import { attributionSchema } from "./shared";

export async function enqueueConversion(
  tx: Prisma.TransactionClient,
  order: ConversionOrder,
  name: ConversionName,
  occurredAt: Date,
  browser?: { userAgent?: string; ip?: string; sourceUrl: string },
) {
  const payload = buildConversion(order, name, occurredAt, browser);
  if (!payload) return;
  // No update on an existing event: retries/status edits must preserve the first timestamp/value.
  await tx.metaConversionEvent.upsert({
    where: { orderId_eventName: { orderId: order.id, eventName: name } },
    create: {
      orderId: order.id,
      eventName: name,
      eventId: payload.event_id,
      occurredAt,
      payload: payload as unknown as Prisma.InputJsonObject,
    },
    update: {},
  });
}

export function scheduleConversions(orderId?: string) {
  after(async () => {
    try { await dispatchConversions(orderId); }
    catch { console.error("Meta outbox processing failed; pending events will be retried by the scheduler."); }
  });
}

export function capiConfig() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const version = process.env.META_GRAPH_API_VERSION;
  if (process.env.META_CAPI_ENABLED !== "true" || process.env.NEXT_PUBLIC_META_ENABLED !== "true" ||
      !/^\d+$/.test(pixelId ?? "") || !token || !/^v\d+\.0$/.test(version ?? "")) return null;
  // Accidental preview/local sends are blocked unless an explicit test code is configured.
  const production = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";
  if (!production && !process.env.META_TEST_EVENT_CODE) return null;
  return { pixelId, token, version, testCode: process.env.META_TEST_EVENT_CODE };
}

type OutboxClient = Pick<PrismaClient, "order" | "metaConversionEvent">;

export async function dispatchConversions(orderId?: string, db: OutboxClient = prisma) {
  await maintainMetaData(db);
  const config = capiConfig();
  const result = { sent: 0, failed: 0, deferred: 0, disabled: !config };
  if (!config) return result;
  const now = new Date();
  const due = await db.metaConversionEvent.findMany({
    where: {
      ...(orderId ? { orderId } : {}),
      status: "PENDING", nextAttemptAt: { lte: now },
      OR: [{ lockedUntil: null }, { lockedUntil: { lt: now } }],
    },
    orderBy: { occurredAt: "asc" }, take: 5,
  });
  for (const event of due) {
    const leaseToken = randomUUID();
    const claimed = await db.metaConversionEvent.updateMany({
      where: {
        id: event.id, status: "PENDING", nextAttemptAt: { lte: new Date() },
        OR: [{ lockedUntil: null }, { lockedUntil: { lt: new Date() } }],
      },
      data: { leaseToken, lockedUntil: new Date(Date.now() + 60_000), attempts: { increment: 1 } },
    });
    if (!claimed.count) continue;
    const owned = { id: event.id, leaseToken };
    const currentOrder = await db.order.findUnique({ where: { id: event.orderId }, select: { attribution: true } });
    if (!attributionSchema.safeParse(currentOrder?.attribution).success) {
      await db.metaConversionEvent.updateMany({ where: owned, data: { status: "SUPPRESSED", payload: {}, lockedUntil: null, leaseToken: null } });
      continue;
    }
    if (eventExpired(event.occurredAt)) {
      await db.metaConversionEvent.updateMany({ where: owned, data: { status: "EXPIRED", lastError: "Event exceeds delivery age limit", payload: {}, lockedUntil: null, leaseToken: null } });
      result.failed++;
      continue;
    }
    try {
      const response = await fetch(`https://graph.facebook.com/${config.version}/${config.pixelId}/events`, {
        method: "POST", cache: "no-store", signal: AbortSignal.timeout(8000),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.token}` },
        body: JSON.stringify({ data: [event.payload], ...(config.testCode ? { test_event_code: config.testCode } : {}) }),
      });
      const body = await response.json().catch(() => null) as { events_received?: number; error?: { code?: number; is_transient?: boolean } } | null;
      if (!response.ok || body?.events_received !== 1) {
        const permanent = response.status >= 400 && response.status < 500 && response.status !== 429 && body?.error?.is_transient !== true;
        const failed = permanent || event.attempts + 1 >= 10;
        await db.metaConversionEvent.updateMany({ where: owned, data: {
          status: failed ? "FAILED" : "PENDING",
          // Never persist Meta response bodies: they can echo customer data or credentials.
          lastError: `Meta HTTP ${response.status}; code ${typeof body?.error?.code === "number" ? body.error.code : "unknown"}`,
          nextAttemptAt: retryAt(event.attempts + 1, new Date()), lockedUntil: null, leaseToken: null,
        } });
        if (failed) result.failed++; else result.deferred++;
        continue;
      }
      await db.metaConversionEvent.updateMany({ where: owned, data: {
        status: "SENT", sentAt: new Date(), lastError: null, lockedUntil: null, leaseToken: null,
        // Delivery is complete; keep event identity and status but remove matching identifiers.
        payload: {},
      } });
      result.sent++;
    } catch {
      await db.metaConversionEvent.updateMany({ where: owned, data: {
        status: event.attempts + 1 >= 10 ? "FAILED" : "PENDING",
        lastError: "Network or response processing failure",
        nextAttemptAt: retryAt(event.attempts + 1, new Date()), lockedUntil: null, leaseToken: null,
      } });
      result.deferred++;
    }
  }
  return result;
}

export async function maintainMetaData(db: OutboxClient = prisma) {
  const now = Date.now();
  const stale = new Date(now - 7 * 86400_000);
  await db.metaConversionEvent.updateMany({
    where: { occurredAt: { lte: stale }, status: "PENDING" },
    data: { status: "EXPIRED", payload: {}, leaseToken: null, lockedUntil: null, lastError: "Event exceeds delivery age limit" },
  });
  await db.metaConversionEvent.updateMany({
    where: { occurredAt: { lte: stale } }, data: { payload: {} },
  });
  await db.order.updateMany({
    where: { attribution: { path: ["capturedAt"], lt: new Date(now - 90 * 86400_000).toISOString() } },
    data: { attribution: Prisma.DbNull },
  });
}
