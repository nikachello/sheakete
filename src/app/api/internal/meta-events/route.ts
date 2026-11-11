import { timingSafeEqual } from "node:crypto";
import { dispatchConversions } from "@/lib/meta/outbox";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const provided = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret ?? ""}`);
  if (!secret || provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return Response.json(await dispatchConversions(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Outbox unavailable" }, { status: 503 });
  }
}

export const POST = GET;
