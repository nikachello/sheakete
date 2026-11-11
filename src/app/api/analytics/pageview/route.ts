import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { TRACKING_PREFERENCE_COOKIE } from "@/lib/meta/shared";
import { ANALYTICS_COOKIE, ANALYTICS_RETENTION_DAYS } from "@/lib/site-analytics/shared";
import { analyticsSigningKey, knownBot, publicPath, readIdentity, resolveIdentity, serverSiteAnalyticsEnabled, signIdentity, trafficSource } from "@/lib/site-analytics/identity";

export const runtime = "nodejs";
const inputSchema = z.object({
  id: z.string().uuid(), path: z.string().max(500),
  source: z.string().max(100).optional(), campaign: z.string().max(128).optional(),
  referrer: z.string().max(1000).optional(), metaClick: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  if (!serverSiteAnalyticsEnabled()) return new Response(null, { status: 204 });
  const origin = new URL(request.url).origin;
  if (request.headers.get("origin") !== origin) return new Response(null, { status: 403 });
  if (request.cookies.get(TRACKING_PREFERENCE_COOKIE)?.value === "denied" || knownBot(request.headers.get("user-agent") || "")) return new Response(null, { status: 204 });
  const expected = Buffer.from(process.env.ADMIN_PASSWORD || "");
  const provided = Buffer.from(request.cookies.get("admin_access")?.value || "");
  if (expected.length && provided.length === expected.length && timingSafeEqual(provided, expected)) return new Response(null, { status: 204 });
  const key = analyticsSigningKey();
  if (!key) return NextResponse.json({ error: "Analytics is not configured" }, { status: 503 });
  if (Number(request.headers.get("content-length") || 0) > 4096) return new Response(null, { status: 413 });
  try {
    const raw = await request.text();
    if (raw.length > 4096) return new Response(null, { status: 413 });
    let json: unknown;
    try { json = JSON.parse(raw); } catch { return new Response(null, { status: 400 }); }
    const parsed = inputSchema.safeParse(json);
    if (!parsed.success) return new Response(null, { status: 400 });
    const input = parsed.data;
    const path = publicPath(input.path);
    if (!path) return new Response(null, { status: 400 });
    const previous = readIdentity(request.cookies.get(ANALYTICS_COOKIE)?.value, key);
    const source = trafficSource(input.source, input.referrer, origin, !!input.metaClick);
    const campaign = input.campaign && /^[A-Za-z0-9_.:-]{1,128}$/.test(input.campaign) ? input.campaign : undefined;
    const identity = resolveIdentity(previous, source, campaign);
    // A soft per-browser abuse limit; this is not a complete bot detector.
    if (previous) {
      const recent = await prisma.sitePageView.count({ where: { visitorId: previous.visitorId, createdAt: { gte: new Date(Date.now() - 60_000) } } });
      if (recent >= 60) return new Response(null, { status: 429 });
    }
    await prisma.sitePageView.createMany({ data: [{
      id: input.id, visitorId: identity.visitorId, sessionId: identity.sessionId,
      path, source: identity.source, campaign: identity.campaign,
    }], skipDuplicates: true });
    const response = new NextResponse(null, { status: 204 });
    response.cookies.set(ANALYTICS_COOKIE, signIdentity(identity, key), {
      path: "/", httpOnly: true, secure: request.nextUrl.protocol === "https:",
      sameSite: "lax", maxAge: ANALYTICS_RETENTION_DAYS * 86400,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Analytics unavailable" }, { status: 503 });
  }
}
