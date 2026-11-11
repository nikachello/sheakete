import { randomUUID } from "node:crypto";
import { requireAdmin } from "@/lib/admin-auth";
import { capiConfig } from "@/lib/meta/outbox";
import { purchaseProbe } from "@/lib/meta/diagnostic";

export const runtime = "nodejs";
export const maxDuration = 60;

// POST only, authenticated, same-origin, and explicitly test-code guarded.
// Viewing diagnostics/normal scheduler runs must never generate synthetic purchases.
export async function POST(request: Request) {
  try { await requireAdmin(); }
  catch { return Response.json({ error: "Unauthorized" }, { status: 401 }); }
  const origin = new URL(request.url).origin;
  if (request.headers.get("origin") !== origin) {
    return Response.json({ error: "Same-origin request required" }, { status: 403 });
  }
  const body = await request.json().catch(() => null);
  if (body?.confirmation !== "SEND_SYNTHETIC_TEST_PURCHASES") {
    return Response.json({ error: "Explicit test confirmation required" }, { status: 400 });
  }
  const config = capiConfig();
  if (!config?.testCode || !/^TEST[A-Za-z0-9]+$/.test(config.testCode)) {
    return Response.json({ error: "A valid server test event code must be configured" }, { status: 409 });
  }
  const runId = randomUUID();
  const results = [];
  for (const source of ["website", "phone_call"] as const) {
    const payload = purchaseProbe(source, origin, runId, new Date());
    try {
      const response = await fetch(`https://graph.facebook.com/${config.version}/${config.pixelId}/events`, {
        method: "POST", cache: "no-store", signal: AbortSignal.timeout(8000),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.token}` },
        body: JSON.stringify({ data: [payload], test_event_code: config.testCode }),
      });
      const receipt = await response.json().catch(() => null);
      results.push({
        source, eventId: payload.event_id, httpStatus: response.status,
        acceptedCount: typeof receipt?.events_received === "number" ? receipt.events_received : 0,
        traceId: typeof receipt?.fbtrace_id === "string" ? receipt.fbtrace_id : null,
        errorCode: typeof receipt?.error?.code === "number" ? receipt.error.code : null,
        messageCount: Array.isArray(receipt?.messages) ? receipt.messages.length : 0,
      });
    } catch {
      results.push({ source, eventId: payload.event_id, error: "Request failed or timed out" });
    }
  }
  return Response.json({ datasetId: config.pixelId, testCode: config.testCode, runId, results }, { headers: { "Cache-Control": "no-store" } });
}
