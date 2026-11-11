import { hashIdentifier } from "./payload";

// Synthetic fixtures only. Never use a customer's order/phone in this comparison.
export function purchaseProbe(source: "website" | "phone_call", origin: string, runId: string, now: Date) {
  return {
    event_name: "Purchase",
    event_id: `diagnostic_${runId}_${source}`,
    event_time: Math.floor(now.getTime() / 1000),
    action_source: source,
    ...(source === "website" ? { event_source_url: `${new URL(origin).origin}/` } : {}),
    user_data: {
      em: [hashIdentifier("meta-diagnostic@example.com")],
      ...(source === "website" ? { client_user_agent: "Mozilla/5.0 (Sheakete integration diagnostic)" } : {}),
    },
    custom_data: {
      currency: "GEL", value: 1,
      content_name: "SYNTHETIC TRACKING TEST — NOT A CUSTOMER ORDER",
      order_id: `diagnostic_${runId}_${source}`,
    },
  };
}
