import assert from "node:assert/strict";
import { test } from "node:test";
import { Prisma, type MetaConversionEvent } from "../prisma/generated/prisma/client";
import { buildConversion, captureWebsiteContext, normalizePhone, hashIdentifier, eventExpired } from "../src/lib/meta/payload";
import { createLeadSchema } from "../src/validations/lead.validation";
import { cleanUrl, attributionSchema } from "../src/lib/meta/shared";
import { TRACKING_PREFERENCE_COOKIE, SESSION_COOKIE } from "../src/lib/meta/shared";
import { getAttribution, setTrackingEnabled, trackMetaEvent } from "../src/lib/meta/browser";
import { confirmLead } from "../src/services/analytics/confirm-lead.service";
import { dispatchConversions } from "../src/lib/meta/outbox";
import { purchaseProbe } from "../src/lib/meta/diagnostic";

test("diagnostic source comparison uses synthetic data and distinct event IDs", () => {
  const now = new Date();
  const website = purchaseProbe("website", "https://shop.example", "test-run", now);
  const call = purchaseProbe("phone_call", "https://shop.example", "test-run", now);
  assert.equal(website.action_source, "website");
  assert.equal(call.action_source, "phone_call");
  assert.notEqual(website.event_id, call.event_id);
  assert.equal(website.event_time, call.event_time);
  assert.deepEqual(website.custom_data.currency, call.custom_data.currency);
  assert.deepEqual(website.user_data.em, call.user_data.em);
  assert.equal(website.event_source_url, "https://shop.example/");
  assert.equal(call.event_source_url, undefined);
  assert.ok(!("ph" in website.user_data));
});

const attribution = {
  consent: true as const,
  consentSessionId: "11111111-1111-4111-8111-111111111111",
  capturedAt: new Date().toISOString(),
  landingUrl: "https://shop.example/product/tool",
  fbc: "fb.1.1234567890.actualClickId",
  fbp: "fb.1.1234567890.1234",
};
const order = {
  id: "22222222-2222-4222-8222-222222222222",
  customerPhone: "+995555123456", productId: "sanity-product-id",
  productTitle: "Product", quantity: 3, expectedPrice: 50, attribution,
};

test("phone normalization accepts Georgian local/international forms and rejects junk", () => {
  assert.equal(normalizePhone("555 12 34 56"), "+995555123456");
  assert.equal(normalizePhone("00995 555 123456"), "+995555123456");
  assert.throws(() => normalizePhone("123"));
});

test("lead matching hashes phone; browser/server copies have a stable event ID", () => {
  const browser = { sourceUrl: attribution.landingUrl, ip: "203.0.113.1", userAgent: "Customer browser" };
  const lead = buildConversion(order, "Lead", new Date(), browser)!;
  assert.equal(lead.event_id, `lead_${order.id}`);
  assert.equal(lead.user_data.ph[0], hashIdentifier("995555123456"));
  assert.equal(lead.user_data.fbc, attribution.fbc);
  assert.equal(lead.user_data.client_user_agent, browser.userAgent);
  assert.equal(lead.action_source, "website");
  assert.equal(lead.custom_data.value, undefined);
  assert.ok(!JSON.stringify(lead).includes(order.customerPhone));
});

test("historical purchase keeps its classification and excludes staff browser information", () => {
  const purchase = buildConversion(order, "Purchase", new Date(), { sourceUrl: "https://shop.example/admin", userAgent: "Staff", ip: "203.0.113.2" })!;
  assert.equal(purchase.custom_data.value, 50); // Not 50 * quantity, and not profit.
  assert.equal(purchase.custom_data.currency, "GEL");
  assert.equal(purchase.action_source, "phone_call");
  assert.equal(purchase.event_source_url, undefined);
  assert.equal(purchase.user_data.client_user_agent, undefined);
  assert.equal(purchase.user_data.client_ip_address, undefined);
  assert.throws(() => buildConversion({ ...order, expectedPrice: 0 }, "Purchase", new Date()));
});

test("new confirmed website purchase reuses original customer context and full order total", () => {
  const customer = { sourceUrl: "https://shop.example/product/tool", userAgent: "Original customer browser", ip: "203.0.113.1" };
  const saved = captureWebsiteContext(attributionSchema.parse(attribution), customer);
  const purchase = buildConversion({ ...order, attribution: saved }, "Purchase", new Date(), {
    sourceUrl: "https://shop.example/admin", userAgent: "Manager browser", ip: "203.0.113.2",
  })!;
  assert.equal(purchase.action_source, "website");
  assert.equal(purchase.event_source_url, customer.sourceUrl);
  assert.equal(purchase.user_data.client_user_agent, customer.userAgent);
  assert.equal(purchase.user_data.client_ip_address, customer.ip);
  assert.equal(purchase.custom_data.value, 50);
  assert.equal(purchase.event_id, `purchase_${order.id}`);
});

test("browser context supplied by the client cannot replace server-captured context", () => {
  const parsed = attributionSchema.parse(attribution);
  const untrusted = { ...parsed, websiteContext: { sourceUrl: "https://untrusted.example", userAgent: "Forged browser" } };
  const captured = captureWebsiteContext(untrusted, { sourceUrl: "https://shop.example/product/tool", userAgent: "Real request browser" })!;
  assert.equal(captured.websiteContext?.userAgent, "Real request browser");
  assert.equal(captured.websiteContext?.sourceUrl, "https://shop.example/product/tool");
  assert.equal(captureWebsiteContext(untrusted, undefined)?.websiteContext, undefined);
  assert.equal(captureWebsiteContext(undefined, { sourceUrl: "https://shop.example", userAgent: "Browser" }), undefined);
});

test("missing attribution suppresses conversions; delivery time is independent of click/lead age", () => {
  assert.equal(buildConversion({ ...order, attribution: null }, "Purchase", new Date()), null);
  const event = buildConversion({ ...order, attribution: { ...attribution, capturedAt: "2026-01-01T00:00:00.000Z" } }, "Purchase", new Date())!;
  assert.ok(!eventExpired(new Date(event.event_time * 1000)));
  assert.ok(eventExpired(new Date(Date.now() - 8 * 86400_000)));
});

test("automatic attribution is distinct from historical explicit opt-in", () => {
  const historical = attributionSchema.parse(attribution);
  assert.equal(historical.trackingMode, "opt_in");
  assert.equal(historical.sessionId, attribution.consentSessionId);
  const automatic = attributionSchema.parse({
    trackingMode: "automatic", sessionId: historical.sessionId,
    capturedAt: attribution.capturedAt, landingUrl: attribution.landingUrl,
  });
  assert.equal(automatic.trackingMode, "automatic");
  assert.ok(!("consent" in automatic));
  assert.ok(buildConversion({ ...order, attribution: automatic }, "Purchase", new Date()));
});

test("public input rejects missing identity and does not accept browser-supplied prices", () => {
  const input = createLeadSchema.parse({ submissionId: order.id, name: "Name", phone: order.customerPhone, productId: order.productId, price: 0.01 });
  assert.ok(!("price" in input));
  assert.ok(!createLeadSchema.safeParse({ name: "Name", phone: order.customerPhone }).success);
  assert.equal(cleanUrl("https://shop.example/product/tool?phone=secret#name"), "https://shop.example/product/tool");
  assert.equal(cleanUrl("javascript:alert(1)"), undefined);
});

test("concurrent/repeated confirmations enqueue one purchase with the first confirmed value", async () => {
  let isLead = true;
  const events: unknown[] = [];
  const tx = {
    order: {
      updateMany: async () => {
        if (!isLead) return { count: 0 };
        isLead = false;
        return { count: 1 };
      },
      findUniqueOrThrow: async () => order,
    },
    metaConversionEvent: { upsert: async (args: unknown) => { events.push(args); } },
  } as unknown as Prisma.TransactionClient;
  const result = await Promise.all([confirmLead(tx, order.id), confirmLead(tx, order.id)]);
  assert.deepEqual(result.sort(), [false, true]);
  assert.equal(events.length, 1);
  assert.equal(await confirmLead(tx, order.id), false);
});

test("browser tracking starts automatically, preserves attribution, and respects opt-outs", async (t) => {
  const originalEnv = { enabled: process.env.NEXT_PUBLIC_META_ENABLED, id: process.env.NEXT_PUBLIC_META_PIXEL_ID };
  const globals = ["window", "document", "location", "sessionStorage"] as const;
  const descriptors = globals.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)] as const);
  t.after(() => {
    for (const [key, descriptor] of descriptors) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
    if (originalEnv.enabled === undefined) delete process.env.NEXT_PUBLIC_META_ENABLED; else process.env.NEXT_PUBLIC_META_ENABLED = originalEnv.enabled;
    if (originalEnv.id === undefined) delete process.env.NEXT_PUBLIC_META_PIXEL_ID; else process.env.NEXT_PUBLIC_META_PIXEL_ID = originalEnv.id;
  });
  process.env.NEXT_PUBLIC_META_ENABLED = "false";
  process.env.NEXT_PUBLIC_META_PIXEL_ID = "123456";
  const jar = new Map<string, string>();
  const storage = new Map<string, string>();
  const scripts: { src: string }[] = [];
  const doc = {
    referrer: "https://referrer.example/path?secret=discard",
    get cookie() { return [...jar].map(([key, value]) => `${key}=${value}`).join("; "); },
    set cookie(value: string) {
      const [pair] = value.split(";"); const position = pair.indexOf("=");
      const key = pair.slice(0, position), content = pair.slice(position + 1);
      if (value.includes("Max-Age=0")) jar.delete(key); else jar.set(key, content);
    },
    createElement: () => ({ src: "", async: false }),
    head: { appendChild: (script: { src: string }) => scripts.push(script) },
  };
  const location = new URL("https://shop.example/?utm_source=meta&campaign_id=123&fbclid=RealClick_123");
  Object.defineProperty(globalThis, "window", { configurable: true, value: new EventTarget() });
  Object.defineProperty(globalThis, "document", { configurable: true, value: doc });
  Object.defineProperty(globalThis, "location", { configurable: true, value: location });
  Object.defineProperty(globalThis, "sessionStorage", { configurable: true, value: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
  } });
  trackMetaEvent("PageView");
  assert.equal(scripts.length, 0);
  assert.equal(getAttribution(), undefined);
  process.env.NEXT_PUBLIC_META_ENABLED = "true";
  trackMetaEvent("PageView");
  const initial = getAttribution()!;
  assert.equal(scripts.length, 1);
  assert.equal(jar.get(TRACKING_PREFERENCE_COOKIE), undefined);
  assert.equal(initial.trackingMode, "automatic");
  assert.ok(!("consent" in initial));
  assert.ok(jar.get(SESSION_COOKIE));
  assert.equal(initial.utm_source, "meta");
  assert.ok(initial.fbc?.endsWith(".RealClick_123"));
  assert.equal(initial.referrer, "https://referrer.example/path");
  location.href = "https://shop.example/product/tool";
  assert.equal(getAttribution()!.campaign_id, "123");
  assert.equal(getAttribution()!.landingUrl, "https://shop.example/");
  trackMetaEvent("Lead", {}, "lead_same-order");
  trackMetaEvent("Lead", {}, "lead_same-order");
  assert.equal(scripts.length, 1);
  assert.equal(window.fbq!.queue.filter((entry) => entry[0] === "track" && entry[1] === "Lead").length, 1);
  jar.set(TRACKING_PREFERENCE_COOKIE, "denied");
  const queued = window.fbq!.queue.length;
  trackMetaEvent("ViewContent");
  assert.equal(window.fbq!.queue.length, queued);
  assert.equal(getAttribution(), undefined);
  await setTrackingEnabled(true);
  assert.equal(jar.get(TRACKING_PREFERENCE_COOKIE), "enabled");
  assert.ok(getAttribution());
  location.href = "https://shop.example/admin/leads";
  const beforeAdmin = window.fbq!.queue.length;
  trackMetaEvent("PageView");
  assert.equal(window.fbq!.queue.length, beforeAdmin);
  assert.equal(getAttribution(), undefined);
});

test("outbox delivery, retry, expiry, consent, and competing workers", async (t) => {
  const keys = ["META_CAPI_ENABLED", "NEXT_PUBLIC_META_ENABLED", "NEXT_PUBLIC_META_PIXEL_ID", "META_CAPI_ACCESS_TOKEN", "META_GRAPH_API_VERSION", "META_TEST_EVENT_CODE"];
  const original = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  Object.assign(process.env, {
    META_CAPI_ENABLED: "true", NEXT_PUBLIC_META_ENABLED: "true", NEXT_PUBLIC_META_PIXEL_ID: "123456",
    META_CAPI_ACCESS_TOKEN: "test-only-token", META_GRAPH_API_VERSION: "v25.0", META_TEST_EVENT_CODE: "TEST_ONLY",
  });
  t.after(() => { for (const key of keys) { if (original[key] === undefined) delete process.env[key]; else process.env[key] = original[key]; } });
  const now = new Date();
  let row: MetaConversionEvent = {
    id: "event-row", orderId: order.id, eventName: "Purchase", eventId: `purchase_${order.id}`,
    payload: buildConversion(order, "Purchase", now) as unknown as Prisma.JsonObject,
    occurredAt: now, createdAt: now, status: "PENDING", attempts: 0, nextAttemptAt: now,
    lockedUntil: null, leaseToken: null, sentAt: null, lastError: null,
  };
  let canClaim = true;
  let consent = true;
  let status = 200;
  let networkFails = false;
  let fetches = 0;
  const writes: { status?: string; payload?: unknown; nextAttemptAt?: Date }[] = [];
  const db = {
    metaConversionEvent: {
      findMany: async () => [row],
      updateMany: async (args: { where: { id?: string }; data: { attempts?: unknown; status?: string; payload?: unknown; nextAttemptAt?: Date } }) => {
    if (!args.where.id) return { count: 0 }; // Retention sweep.
    writes.push(args.data);
    return { count: args.data.attempts ? Number(canClaim) : 1 };
      },
    },
    order: {
      updateMany: async () => ({ count: 0 }),
      findUnique: async () => ({ attribution: consent ? attribution : null }),
    },
  } as unknown as NonNullable<Parameters<typeof dispatchConversions>[1]>;
  const dispatch = () => dispatchConversions(undefined, db);
  t.mock.method(globalThis, "fetch", async (_url: string, options: RequestInit) => {
    fetches++;
    const body = JSON.parse(options.body as string);
    assert.equal(body.data[0].event_id, row.eventId);
    assert.equal(body.test_event_code, "TEST_ONLY");
    if (networkFails) throw new Error("offline");
    return Response.json(status === 200 ? { events_received: 1 } : { error: { code: 2 } }, { status });
  });

  assert.equal((await dispatch()).sent, 1);
  assert.equal(writes.at(-1)?.status, "SENT");
  assert.deepEqual(writes.at(-1)?.payload, {});

  status = 503;
  assert.equal((await dispatch()).deferred, 1);
  assert.equal(writes.at(-1)?.status, "PENDING");
  assert.ok(writes.at(-1)!.nextAttemptAt! > now);

  networkFails = true;
  await dispatch();
  assert.equal(writes.at(-1)?.status, "PENDING");
  networkFails = false;

  status = 400;
  assert.equal((await dispatch()).failed, 1);
  assert.equal(writes.at(-1)?.status, "FAILED");

  const before = fetches;
  canClaim = false;
  await dispatch();
  assert.equal(fetches, before);
  canClaim = true;
  consent = false;
  await dispatch();
  assert.equal(writes.at(-1)?.status, "SUPPRESSED");
  assert.equal(fetches, before);
  consent = true;
  row = { ...row, occurredAt: new Date(Date.now() - 8 * 86400_000) };
  await dispatch();
  assert.equal(writes.at(-1)?.status, "EXPIRED");
  assert.equal(fetches, before);
  process.env.META_CAPI_ENABLED = "false";
  assert.equal((await dispatch()).disabled, true);
  assert.equal(fetches, before);
});
