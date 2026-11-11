import assert from "node:assert/strict";
import { test } from "node:test";
import { Client } from "pg";
import { Prisma } from "../prisma/generated/prisma/client";
import { readSiteAnalytics } from "../src/services/analytics/site-analytics.service";

// Explicitly opt in. Only TEMP tables and synthetic fixtures are used. Public
// tables are shadowed for this connection, never updated, read or truncated.
test("PostgreSQL report deduplicates sessions and separates booked value from collected cash", {
  skip: !process.env.ANALYTICS_TEST_DATABASE_URL,
}, async () => {
  const client = new Client({ connectionString: process.env.ANALYTICS_TEST_DATABASE_URL, connectionTimeoutMillis: 15000 });
  await client.connect();
  try {
    await client.query("BEGIN");
    await client.query(`CREATE TEMP TABLE "SitePageView" (
      id text, "createdAt" timestamp, "visitorId" text, "sessionId" text, path text, source text
    ) ON COMMIT DROP`);
    await client.query(`CREATE TEMP TABLE "Order" (
      id text, "createdAt" timestamp, "submissionId" text, type text, status text,
      "expectedPrice" double precision, "cashCollected" double precision, "paymentStatus" text,
      "analyticsSessionId" text, "productId" text, "productTitle" text
    ) ON COMMIT DROP`);
    await client.query(`INSERT INTO "SitePageView" VALUES
      ('v1', '2026-11-11 07:00:00', 'browser-a', 'session-a1', '/', 'meta'),
      ('v2', '2026-11-11 07:01:00', 'browser-a', 'session-a1', '/product/tool', 'meta'),
      ('v3', '2026-11-11 08:00:00', 'browser-a', 'session-a2', '/product/tool', 'direct'),
      ('v4', '2026-11-11 09:00:00', 'browser-b', 'session-b1', '/', 'google.com')`);
    await client.query(`INSERT INTO "Order" VALUES
      ('order-1', '2026-11-11 07:02:00', 'submit-1', 'ORDER', 'DELIVERED', 50, 50, 'COLLECTED', 'session-a1', 'tool', 'Tool'),
      ('order-2', '2026-11-11 07:03:00', 'submit-2', 'ORDER', 'CONFIRMED', 20, NULL, 'AWAITING_COLLECTION', 'session-a1', 'tool', 'Tool'),
      ('order-3', '2026-11-11 09:02:00', 'submit-3', 'LEAD', 'PENDING', 30, NULL, 'AWAITING_COLLECTION', 'session-b1', 'tool', 'Tool'),
      ('manual', '2026-11-11 10:00:00', NULL, 'ORDER', 'DELIVERED', 100, 100, 'COLLECTED', NULL, 'tool', 'Tool'),
      ('older', '2026-10-01 10:00:00', 'submit-old', 'ORDER', 'DELIVERED', 100, 100, 'COLLECTED', 'session-a1', 'tool', 'Tool')`);
    const db = { $queryRaw: async (sql: Prisma.Sql) => (await client.query(sql.text, sql.values)).rows } as unknown as NonNullable<Parameters<typeof readSiteAnalytics>[1]>;
    const report = await readSiteAnalytics("7", db, new Date("2026-11-11T12:00:00Z"));
    assert.ok(report.ready);
    if (!report.ready) return;
    assert.deepEqual(report.traffic, { visitors: 2, sessions: 3, pageViews: 4, productViews: 2 });
    assert.equal(report.sales.leads, 3);
    assert.equal(report.sales.confirmed, 2);
    assert.equal(report.sales.confirmedValue, 70);
    assert.equal(report.sales.collectedRevenue, 50);
    assert.equal(report.sales.leadSessions, 2);
    assert.equal(report.sales.confirmedSessions, 1);
    assert.ok(Math.abs(report.confirmedRate - 100 / 3) < 1e-10);
    assert.equal(report.products[0].leads, 3);
    assert.equal(report.daily.length, 7);
    assert.equal(report.daily.at(-1)?.visitors, 2);
  } finally {
    await client.query("ROLLBACK").catch(() => undefined);
    await client.end();
  }
});
