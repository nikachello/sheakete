import { createHash } from "node:crypto";
import { attributionSchema } from "./shared";

export type ConversionName = "Lead" | "Purchase";
export interface ConversionOrder {
  id: string;
  customerPhone: string;
  productId: string | null;
  productTitle: string | null;
  quantity: number;
  expectedPrice: number;
  attribution: unknown;
}

export interface MetaEventPayload {
  event_name: ConversionName;
  event_id: string;
  event_time: number;
  action_source: "website" | "phone_call";
  event_source_url?: string;
  user_data: {
    ph: string[];
    external_id: string[];
    fbc?: string;
    fbp?: string;
    client_user_agent?: string;
    client_ip_address?: string;
  };
  custom_data: {
    currency: "GEL";
    value?: number;
    order_id: string;
    content_type?: "product";
    content_ids?: string[];
    content_name?: string;
    num_items?: number;
  };
}

export const hashIdentifier = (value: string) => createHash("sha256").update(value).digest("hex");

export function normalizePhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (/^5\d{8}$/.test(digits)) digits = `995${digits}`;
  if (!/^995\d{9}$/.test(digits)) throw new Error("Invalid Georgian phone number");
  return `+${digits}`;
}

export function buildConversion(
  order: ConversionOrder,
  name: ConversionName,
  occurredAt: Date,
  browser?: { userAgent?: string; ip?: string; sourceUrl: string },
): MetaEventPayload | null {
  const result = attributionSchema.safeParse(order.attribution);
  if (!result.success) return null;
  const attribution = result.data;
  if (name === "Lead" && !browser?.sourceUrl) return null;
  if (name === "Purchase" && (!Number.isFinite(order.expectedPrice) || order.expectedPrice <= 0)) {
    throw new Error("A confirmed purchase requires a positive final order total");
  }
  return {
    event_name: name,
    event_id: `${name.toLowerCase()}_${order.id}`,
    event_time: Math.floor(occurredAt.getTime() / 1000),
    action_source: name === "Lead" ? "website" : "phone_call",
    ...(name === "Lead" ? { event_source_url: browser!.sourceUrl } : {}),
    user_data: {
      ph: [hashIdentifier(normalizePhone(order.customerPhone).slice(1))],
      external_id: [hashIdentifier(order.id)],
      ...(attribution.fbc ? { fbc: attribution.fbc } : {}),
      ...(attribution.fbp ? { fbp: attribution.fbp } : {}),
      ...(name === "Lead" && browser?.userAgent ? { client_user_agent: browser.userAgent } : {}),
      ...(name === "Lead" && browser?.ip ? { client_ip_address: browser.ip } : {}),
    },
    custom_data: {
      currency: "GEL",
      order_id: order.id,
      // expectedPrice is the COMPLETE bundle/order total, not a unit price or profit.
      ...(name === "Purchase" ? { value: order.expectedPrice, num_items: order.quantity } : {}),
      ...(order.productId ? { content_ids: [order.productId], content_type: "product" as const } : {}),
      ...(order.productTitle ? { content_name: order.productTitle } : {}),
    },
  };
}

export function retryAt(attempt: number, now: Date): Date {
  return new Date(now.getTime() + Math.min(6 * 3600, 60 * 2 ** Math.min(attempt, 12)) * 1000);
}

export function eventExpired(occurredAt: Date, now = new Date()): boolean {
  return now.getTime() - occurredAt.getTime() >= 7 * 24 * 3600 * 1000;
}
