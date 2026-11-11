"use server";

import { isIP } from "node:net";
import { after } from "next/server";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma-client";
import { prisma } from "@/lib/prisma";
import { client } from "@/lib/sanity.client";
import { createLeadSchema } from "@/validations/lead.validation";
import { TRACKING_PREFERENCE_COOKIE, SESSION_COOKIE, cleanUrl } from "@/lib/meta/shared";
import { captureWebsiteContext, normalizePhone } from "@/lib/meta/payload";
import { enqueueConversion, scheduleConversions } from "@/lib/meta/outbox";
import { ANALYTICS_COOKIE } from "@/lib/site-analytics/shared";
import { analyticsSigningKey, readIdentity, serverSiteAnalyticsEnabled } from "@/lib/site-analytics/identity";

interface ProductOffer {
  _id: string;
  title: string;
  slug: string;
  price: number;
  unit: string | null;
  combos: { _key: string; quantity: number; totalPrice: number }[] | null;
}

export async function createLead(rawData: unknown) {
  try {
    const input = createLeadSchema.parse(rawData);
    const phone = normalizePhone(input.phone);
    const product = await client.withConfig({ useCdn: false }).fetch<ProductOffer | null>(
      `*[_type == "product" && _id == $id && !(_id in path("drafts.**")) && defined(slug.current)][0]{_id,title,"slug":slug.current,price,unit,combos[]{_key,quantity,totalPrice}}`,
      { id: input.productId }, { cache: "no-store" },
    );
    if (!product) return { success: false as const, error: "Product unavailable" };
    const option = product.combos?.find((item) => item._key === input.optionKey);
    if ((product.combos?.length && !option) || (input.optionKey && !option)) {
      return { success: false as const, error: "Please select an available offer" };
    }
    const price = option ? option.totalPrice : product.price;
    const quantity = option ? option.quantity : 1;
    if (!Number.isFinite(price) || price <= 0 || !Number.isInteger(quantity) || quantity < 1 || quantity > 1000) {
      return { success: false as const, error: "Offer unavailable" };
    }
    const requestHeaders = await headers();
    const cookieStore = await cookies();
    const analytics = serverSiteAnalyticsEnabled() && cookieStore.get(TRACKING_PREFERENCE_COOKIE)?.value !== "denied"
      ? readIdentity(cookieStore.get(ANALYTICS_COOKIE)?.value, analyticsSigningKey()) : null;
    const origin = process.env.NEXT_PUBLIC_SITE_URL || requestHeaders.get("origin");
    const site = origin ? new URL(origin).origin : undefined;
    const trackingAllowed = process.env.NEXT_PUBLIC_META_ENABLED === "true" &&
      cookieStore.get(TRACKING_PREFERENCE_COOKIE)?.value !== "denied" && !!input.attribution &&
      cookieStore.get(SESSION_COOKIE)?.value === input.attribution.sessionId;
    const attributionBase = trackingAllowed && site && new URL(input.attribution!.landingUrl).origin === site
      ? { ...input.attribution!, landingUrl: cleanUrl(input.attribution!.landingUrl)!, referrer: cleanUrl(input.attribution!.referrer ?? "") }
      : undefined;
    const forwardedIp = process.env.META_TRUST_PROXY_HEADERS === "true"
      ? requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() : undefined;
    const browser = site ? {
      sourceUrl: `${site}/product/${encodeURIComponent(product.slug)}`,
      userAgent: requestHeaders.get("user-agent")?.slice(0, 1000),
      ip: forwardedIp && isIP(forwardedIp) ? forwardedIp : undefined,
    } : undefined;
    const attribution = captureWebsiteContext(attributionBase, browser);
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.order.findUnique({ where: { submissionId: input.submissionId } });
      if (existing) {
        if (existing.customerPhone !== phone || existing.productId !== input.productId) throw new Error("Submission mismatch");
        const event = await tx.metaConversionEvent.findUnique({ where: { orderId_eventName: { orderId: existing.id, eventName: "Lead" } } });
        return { id: existing.id, eventId: event?.eventId, created: false, order: existing };
      }
      const order = await tx.order.create({ data: {
        submissionId: input.submissionId,
        analyticsVisitorId: analytics?.visitorId,
        analyticsSessionId: analytics?.sessionId,
        customerName: input.name, customerPhone: phone,
        productId: product._id, productTitle: product.title,
        quantity, comboDetails: `${quantity} ${product.unit || "ცალი"}`,
        expectedPrice: price, status: "PENDING", type: "LEAD",
        attribution: attribution ? JSON.parse(JSON.stringify(attribution)) as Prisma.InputJsonObject : Prisma.DbNull,
      } });
      await enqueueConversion(tx, order, "Lead", order.createdAt, browser);
      return { id: order.id, eventId: attribution ? `lead_${order.id}` : undefined, created: true, order };
    });

    if (result.created) {
      // Notifications cannot change the outcome of an already-committed lead.
      after(async () => {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        if (!token || !chatId) return;
        try {
          const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST", signal: AbortSignal.timeout(5000),
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: `ახალი შეკვეთა\n${result.order.customerName}\n${result.order.customerPhone}\n${result.order.productTitle}\n${result.order.comboDetails}\n${result.order.expectedPrice} GEL` }),
          });
          if (!response.ok) console.error("Lead saved; Telegram notification failed.");
        } catch { console.error("Lead saved; Telegram notification unavailable."); }
      });
    }
    scheduleConversions(result.id);
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/leads");
    return { success: true as const, id: result.id, eventId: result.eventId };
  } catch (error) {
    // A concurrent retry may lose the unique submissionId race; retry with the SAME ID.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false as const, error: "Submission is being processed. Please retry." };
    }
    console.error("Lead submission failed.");
    return { success: false as const, error: "შეკვეთა ვერ შეინახა. გადაამოწმეთ მონაცემები და სცადეთ ხელახლა." };
  }
}
