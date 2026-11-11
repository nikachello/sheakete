import assert from "node:assert/strict";
import { test } from "node:test";
import { knownBot, publicPath, readIdentity, resolveIdentity, serverSiteAnalyticsEnabled, signIdentity, trafficSource } from "../src/lib/site-analytics/identity";
import { reportRange, conversionRate, tbilisiDate } from "../src/lib/site-analytics/range";

test("signed visitor identities reject tampering, wrong keys and expired cookies", () => {
  const now = Date.parse("2026-11-11T12:00:00Z");
  const identity = resolveIdentity(null, "meta", "campaign-1", now);
  const cookie = signIdentity(identity, "test-key");
  assert.deepEqual(readIdentity(cookie, "test-key", now), identity);
  assert.equal(readIdentity(cookie, "wrong-key", now), null);
  assert.equal(readIdentity(cookie.replace(cookie[0], cookie[0] === "a" ? "b" : "a"), "test-key", now), null);
  assert.equal(readIdentity(cookie, "test-key", now + 91 * 86400_000), null);
  assert.equal(readIdentity(cookie, null, now), null);
  assert.equal(readIdentity(cookie, "test-key", now - 120_000), null);
});

test("navigation retains one browser and session; inactivity starts a new session, not a new visitor", () => {
  const now = Date.now();
  const first = resolveIdentity(null, "meta", "campaign-1", now);
  const nextPage = resolveIdentity(first, "direct", undefined, now + 60_000);
  assert.equal(nextPage.visitorId, first.visitorId);
  assert.equal(nextPage.sessionId, first.sessionId);
  assert.equal(nextPage.source, "meta");
  assert.equal(nextPage.campaign, "campaign-1");
  const later = resolveIdentity(nextPage, "google.com", undefined, now + 31 * 60_000);
  assert.equal(later.visitorId, first.visitorId);
  assert.notEqual(later.sessionId, first.sessionId);
  assert.equal(later.source, "google.com");
  assert.equal(later.campaign, undefined);
  assert.notEqual(resolveIdentity(null, "direct", undefined, now).visitorId, first.visitorId);
});

test("only public store paths are accepted and query/fragment content is never retained", () => {
  assert.equal(publicPath("/"), "/");
  assert.equal(publicPath("/product/tool"), "/product/tool");
  assert.equal(publicPath("/privacy"), "/privacy");
  for (const path of ["/admin/orders", "/%61dmin/orders", "/api/analytics", "/_next/x", "//other.example", "/product/tool?phone=secret", "/product/tool#name", "/product/tool%3Fphone=secret", "/product/a%2Fb", "/arbitrary-path"]) {
    assert.equal(publicPath(path), null, path);
  }
});

test("traffic source prioritizes explicit campaigns and never retains a referrer query", () => {
  assert.equal(trafficSource("Meta", "https://google.com/?email=secret", "https://shop.example", false), "meta");
  assert.equal(trafficSource(undefined, undefined, "https://shop.example", true), "meta");
  assert.equal(trafficSource(undefined, "https://google.com/search?q=secret", "https://shop.example", false), "google.com");
  assert.equal(trafficSource(undefined, "https://shop.example/product/tool", "https://shop.example", false), "direct");
  assert.equal(trafficSource(undefined, "javascript:alert(1)", "https://shop.example", false), "direct");
  assert.ok(knownBot("facebookexternalhit/1.1"));
  assert.ok(knownBot("Googlebot/2.1"));
  assert.ok(!knownBot("Mozilla/5.0 Chrome/130.0 Mobile Safari/537.36"));
});

test("date ranges use Tbilisi midnight rather than the host timezone", () => {
  const now = new Date("2026-11-11T21:00:00Z"); // Nov 12, 01:00 in Tbilisi.
  assert.equal(tbilisiDate(now), "2026-11-12");
  assert.equal(reportRange("today", now).start.toISOString(), "2026-11-11T20:00:00.000Z");
  assert.equal(reportRange("7", now).start.toISOString(), "2026-11-05T20:00:00.000Z");
  assert.equal(reportRange("30", now).days, 30);
  assert.equal(reportRange("invalid", now).range, "7");
  assert.equal(conversionRate(0, 0), 0);
  assert.equal(conversionRate(2, 10), 20);
});

test("collection defaults to production and explicit disable flags take precedence", (t) => {
  const keys = ["NODE_ENV", "VERCEL_ENV", "NEXT_PUBLIC_SITE_ANALYTICS_ENABLED", "SITE_ANALYTICS_ENABLED"];
  const original = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  t.after(() => { for (const key of keys) { if (original[key] === undefined) delete process.env[key]; else process.env[key] = original[key]; } });
  for (const key of keys) delete process.env[key];
  Object.assign(process.env, { NODE_ENV: "development" });
  assert.equal(serverSiteAnalyticsEnabled(), false);
  Object.assign(process.env, { NODE_ENV: "production", VERCEL_ENV: "production" });
  assert.equal(serverSiteAnalyticsEnabled(), true);
  process.env.VERCEL_ENV = "preview";
  assert.equal(serverSiteAnalyticsEnabled(), false);
  process.env.NEXT_PUBLIC_SITE_ANALYTICS_ENABLED = "true";
  assert.equal(serverSiteAnalyticsEnabled(), true);
  process.env.SITE_ANALYTICS_ENABLED = "false";
  assert.equal(serverSiteAnalyticsEnabled(), false);
  delete process.env.SITE_ANALYTICS_ENABLED;
  process.env.NEXT_PUBLIC_SITE_ANALYTICS_ENABLED = "false";
  assert.equal(serverSiteAnalyticsEnabled(), false);
});
