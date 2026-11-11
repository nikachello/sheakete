import { createHash } from "node:crypto";
import Link from "next/link";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { capiConfig } from "@/lib/meta/outbox";
import { attributionSchema } from "@/lib/meta/shared";

export const dynamic = "force-dynamic";

function databaseReference() {
  try {
    const url = new URL(process.env.DATABASE_URL ?? "");
    return createHash("sha256")
      .update(`${url.hostname.replace("-pooler", "")}${url.pathname}/${url.searchParams.get("schema") || "public"}`)
      .digest("hex").slice(0, 12);
  } catch { return "Not configured"; }
}

const time = (value: Date | null) => value ? value.toISOString() : "—";

export default async function TrackingPage({ searchParams }: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  await requireAdmin();
  const { orderId: requestedId } = await searchParams;
  const id = z.string().uuid().safeParse(requestedId);
  const [order, events] = await Promise.all([
    id.success ? prisma.order.findUnique({
      where: { id: id.data },
      select: { id: true, type: true, status: true, attribution: true },
    }) : null,
    prisma.metaConversionEvent.findMany({
      where: id.success ? { orderId: id.data } : {},
      orderBy: { createdAt: "desc" }, take: 20,
      select: {
        id: true, orderId: true, eventName: true, status: true,
        attempts: true, occurredAt: true, sentAt: true, nextAttemptAt: true, lastError: true,
      },
    }),
  ]);
  const attribution = order ? attributionSchema.safeParse(order.attribution) : null;
  const purchase = events.find((event) => event.eventName === "Purchase");
  const config = [
    ["Pixel / Dataset ID", process.env.NEXT_PUBLIC_META_PIXEL_ID || "Missing"],
    ["Pixel enabled", process.env.NEXT_PUBLIC_META_ENABLED === "true" ? "Yes" : "No"],
    ["CAPI enabled", process.env.META_CAPI_ENABLED === "true" ? "Yes" : "No"],
    ["Access token configured", process.env.META_CAPI_ACCESS_TOKEN ? "Yes (value hidden)" : "No"],
    ["Graph API version", process.env.META_GRAPH_API_VERSION || "Missing"],
    ["Server test event code", process.env.META_TEST_EVENT_CODE || "Not set — production events"],
    ["Sender ready", capiConfig() ? "Yes" : "No — configuration is incomplete or disabled"],
    ["Scheduler secret configured", process.env.CRON_SECRET ? "Yes (value hidden)" : "No"],
    ["Database reference", databaseReference()],
  ];
  return (
    <main className="mx-auto max-w-5xl space-y-6 pb-10 text-zinc-900">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Meta tracking diagnostics</h1>
        <p className="text-sm text-zinc-600">Read-only delivery information from this deployment. All times are UTC. Tokens, customer details and matching identifiers are hidden.</p>
      </header>
      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-3 font-bold">Deployed configuration</h2>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          {config.map(([label, value]) => <div key={label}><dt className="text-zinc-500">{label}</dt><dd className="break-all font-medium">{value}</dd></div>)}
        </dl>
      </section>
      <form action="/admin/tracking" method="get" className="space-y-2 rounded-xl border bg-white p-4">
        <label htmlFor="orderId" className="block text-sm font-bold">Order ID</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input id="orderId" name="orderId" defaultValue={requestedId || ""} placeholder="Paste the order UUID" className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm" />
          <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white">Check order</button>
          <Link href="/admin/tracking" className="rounded-lg border px-4 py-2 text-center text-sm">Show recent events</Link>
        </div>
        {requestedId && !id.success && <p role="alert" className="text-sm text-red-700">Enter a valid order UUID.</p>}
      </form>
      {id.success && <section className="space-y-2 rounded-xl border bg-white p-4 text-sm">
        <h2 className="font-bold">Order tracking state</h2>
        {!order ? <p>This order does not exist in this deployment&apos;s database.</p> : <>
          <p>{order.type} / {order.status}</p>
          <p>Tracking attribution: {attribution?.success ? `Valid (${attribution.data.trackingMode})` : "Missing or invalid — this order cannot generate a conversion"}</p>
          {purchase ? <p>Purchase: <strong>{purchase.status}</strong>. {purchase.status === "SENT" ? "Meta accepted the event. Check the dataset and test/production view shown above." : "See the delivery status and error below."}</p>
            : <p>No Purchase event is recorded for this order.{order.type === "LEAD" ? " It has not been converted to an order." : " It was not queued during confirmation; this is different from a Meta delivery failure."}</p>}
        </>}
      </section>}
      <section className="overflow-x-auto rounded-xl border bg-white p-4">
        <h2 className="mb-3 font-bold">{id.success ? "Order events" : "Latest events"}</h2>
        {events.length === 0 ? <p className="text-sm text-zinc-500">No events recorded.</p> : <table className="w-full min-w-[800px] text-left text-xs">
          <thead><tr className="border-b">{["Order", "Event", "Status", "Attempts", "Occurred (UTC)", "Sent (UTC)", "Next retry (UTC)", "Last error"].map((label) => <th key={label} className="p-2">{label}</th>)}</tr></thead>
          <tbody>{events.map((event) => <tr key={event.id} className="border-b align-top">
            <td className="p-2"><Link className="underline" href={`/admin/tracking?orderId=${event.orderId}`}>{event.orderId.slice(0, 8)}…</Link></td>
            <td className="p-2">{event.eventName}</td><td className="p-2 font-bold">{event.status}</td><td className="p-2">{event.attempts}</td>
            <td className="p-2">{time(event.occurredAt)}</td><td className="p-2">{time(event.sentAt)}</td>
            <td className="p-2">{event.status === "PENDING" ? time(event.nextAttemptAt) : "—"}</td><td className="p-2">{event.lastError || "—"}</td>
          </tr>)}</tbody>
        </table>}
      </section>
      <p className="text-sm text-zinc-600">SENT means Meta accepted delivery; it does not guarantee ad attribution. Test Events requires the matching server test code. PENDING is waiting for processing/retry. FAILED needs the error investigated. SUPPRESSED was stopped after an opt-out or missing attribution. EXPIRED exceeded the delivery age limit. This page never resends events.</p>
    </main>
  );
}
