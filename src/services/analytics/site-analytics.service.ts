import { Prisma, type PrismaClient } from "@prisma-client";
import { prisma } from "@/lib/prisma";
import { reportRange, tbilisiDate, conversionRate } from "@/lib/site-analytics/range";

interface TrafficTotals { visitors: number; sessions: number; pageViews: number; productViews: number }
interface SalesTotals {
  leads: number; confirmed: number; delivered: number; cancelled: number; returned: number;
  confirmedValue: number; collectedRevenue: number; leadSessions: number; confirmedSessions: number;
}
export interface DailyTraffic { date: string; visitors: number; sessions: number }

export async function readSiteAnalytics(value?: string, db: Pick<PrismaClient, "$queryRaw"> = prisma, now = new Date()) {
  const period = reportRange(value, now);
  const { start, end } = period;
  try {
    const [trafficRows, salesRows, dailyRows, sources, pages, products] = await Promise.all([
      db.$queryRaw<TrafficTotals[]>(Prisma.sql`
        SELECT COUNT(DISTINCT "visitorId")::int AS visitors,
          COUNT(DISTINCT "sessionId")::int AS sessions, COUNT(*)::int AS "pageViews",
          COUNT(*) FILTER (WHERE path LIKE '/product/%')::int AS "productViews"
        FROM "SitePageView" WHERE "createdAt" >= ${start} AND "createdAt" <= ${end}`),
      db.$queryRaw<SalesTotals[]>(Prisma.sql`
        SELECT COUNT(*)::int AS leads,
          COUNT(*) FILTER (WHERE type = 'ORDER')::int AS confirmed,
          COUNT(*) FILTER (WHERE status = 'DELIVERED')::int AS delivered,
          COUNT(*) FILTER (WHERE status = 'CANCELLED')::int AS cancelled,
          COUNT(*) FILTER (WHERE status = 'RETURNED')::int AS returned,
          COALESCE(SUM("expectedPrice") FILTER (WHERE type = 'ORDER'), 0)::double precision AS "confirmedValue",
          COALESCE(SUM("cashCollected") FILTER (WHERE status = 'DELIVERED' AND "paymentStatus" IN ('COLLECTED', 'SETTLED')), 0)::double precision AS "collectedRevenue",
          COUNT(DISTINCT "analyticsSessionId") FILTER (WHERE "analyticsSessionId" IN (
            SELECT "sessionId" FROM "SitePageView" WHERE "createdAt" >= ${start} AND "createdAt" <= ${end}
          ))::int AS "leadSessions",
          COUNT(DISTINCT "analyticsSessionId") FILTER (WHERE type = 'ORDER' AND "analyticsSessionId" IN (
            SELECT "sessionId" FROM "SitePageView" WHERE "createdAt" >= ${start} AND "createdAt" <= ${end}
          ))::int AS "confirmedSessions"
        FROM "Order" WHERE "submissionId" IS NOT NULL AND "createdAt" >= ${start} AND "createdAt" <= ${end}`),
      db.$queryRaw<DailyTraffic[]>(Prisma.sql`
        SELECT ("createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Tbilisi')::date::text AS date,
          COUNT(DISTINCT "visitorId")::int AS visitors, COUNT(DISTINCT "sessionId")::int AS sessions
        FROM "SitePageView" WHERE "createdAt" >= ${start} AND "createdAt" <= ${end}
        GROUP BY 1 ORDER BY 1`),
      db.$queryRaw<{ source: string; sessions: number; visitors: number }[]>(Prisma.sql`
        SELECT source, COUNT(DISTINCT "sessionId")::int AS sessions, COUNT(DISTINCT "visitorId")::int AS visitors
        FROM "SitePageView" WHERE "createdAt" >= ${start} AND "createdAt" <= ${end}
        GROUP BY source ORDER BY sessions DESC, source ASC LIMIT 10`),
      db.$queryRaw<{ path: string; views: number; visitors: number }[]>(Prisma.sql`
        SELECT path, COUNT(*)::int AS views, COUNT(DISTINCT "visitorId")::int AS visitors
        FROM "SitePageView" WHERE "createdAt" >= ${start} AND "createdAt" <= ${end}
        GROUP BY path ORDER BY views DESC, path ASC LIMIT 10`),
      db.$queryRaw<{ title: string; leads: number; confirmed: number; value: number }[]>(Prisma.sql`
        SELECT COALESCE("productTitle", 'Unknown product') AS title, COUNT(*)::int AS leads,
          COUNT(*) FILTER (WHERE type = 'ORDER')::int AS confirmed,
          COALESCE(SUM("expectedPrice") FILTER (WHERE type = 'ORDER'), 0)::double precision AS value
        FROM "Order" WHERE "submissionId" IS NOT NULL AND "createdAt" >= ${start} AND "createdAt" <= ${end}
        GROUP BY "productId", "productTitle" ORDER BY leads DESC, title ASC LIMIT 10`),
    ]);
    const traffic = trafficRows[0];
    const sales = salesRows[0];
    const daily = Array.from({ length: period.days }, (_, index) => {
      const date = tbilisiDate(new Date(start.getTime() + index * 86400_000));
      return dailyRows.find((row) => row.date === date) ?? { date, visitors: 0, sessions: 0 };
    });
    return {
      ready: true as const, period, traffic, sales, daily, sources, pages, products,
      leadRate: conversionRate(sales.leadSessions, traffic.sessions),
      confirmedRate: conversionRate(sales.confirmedSessions, traffic.sessions),
      averageConfirmedOrder: sales.confirmed > 0 ? sales.confirmedValue / sales.confirmed : 0,
    };
  } catch {
    return { ready: false as const, period };
  }
}

export async function cleanSiteAnalytics() {
  const cutoff = new Date(Date.now() - 90 * 86400_000);
  await prisma.$transaction([
    prisma.sitePageView.deleteMany({ where: { createdAt: { lt: cutoff } } }),
    prisma.order.updateMany({
      where: { createdAt: { lt: cutoff }, analyticsVisitorId: { not: null } },
      data: { analyticsVisitorId: null, analyticsSessionId: null },
    }),
  ]);
}
