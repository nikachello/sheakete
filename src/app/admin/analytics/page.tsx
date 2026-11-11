import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { analyticsSigningKey } from "@/lib/site-analytics/identity";
import { rangeLabels } from "@/lib/site-analytics/range";
import { readSiteAnalytics } from "@/services/analytics/site-analytics.service";
import { TrafficChart } from "@/components/admin/analytics/TrafficChart";

export const dynamic = "force-dynamic";
const number = (value: number) => new Intl.NumberFormat("en-US").format(value);
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "GEL", maximumFractionDigits: 2 }).format(value);

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="rounded-xl border border-zinc-200 bg-white p-4"><p className="text-sm text-zinc-500">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight">{value}</p><p className="mt-2 text-xs leading-5 text-zinc-500">{note}</p></div>;
}

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  await requireAdmin();
  const { range } = await searchParams;
  const report = await readSiteAnalytics(range);
  const activeRange = report.period.range;
  return (
    <main className="mx-auto max-w-7xl space-y-6 pb-10 text-zinc-900">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div><h1 className="text-3xl font-bold tracking-tight">Store analytics</h1><p className="mt-2 text-sm text-zinc-500">Website traffic and the orders it produces. Updates when you refresh. Dates use Asia/Tbilisi.</p></div>
        <a href={`/admin/analytics?range=${activeRange}`} className="inline-flex min-h-11 items-center justify-center rounded-lg border bg-white px-4 text-sm font-medium">Refresh data</a>
      </header>
      <nav aria-label="Analytics date range" className="flex flex-wrap gap-2">
        {Object.entries(rangeLabels).map(([value, label]) => <Link key={value} prefetch={false} href={`/admin/analytics?range=${value}`} aria-current={activeRange === value ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm ${activeRange === value ? "border-zinc-900 bg-zinc-900 text-white" : "bg-white"}`}>{label}</Link>)}
      </nav>
      {!report.ready ? <div role="status" className="rounded-xl border bg-white p-6"><h2 className="font-bold">Analytics is not available yet</h2><p className="mt-2 text-sm text-zinc-600">Apply the site analytics database migration before deploying this version. If the migration is already applied, check database availability.</p></div> : <>
        {!analyticsSigningKey() && <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm">Set SITE_ANALYTICS_SECRET or the existing CRON_SECRET in this environment to enable signed visitor cookies.</p>}
        <section aria-label="Website traffic" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Unique visitors" value={number(report.traffic.visitors)} note="Distinct recognized browsers in this period." />
          <Metric label="Sessions" value={number(report.traffic.sessions)} note="A new session starts after 30 minutes of inactivity." />
          <Metric label="Page views" value={number(report.traffic.pageViews)} note="Public page loads and client-side navigation." />
          <Metric label="Product views" value={number(report.traffic.productViews)} note="Views of individual product pages." />
        </section>
        <section className="rounded-xl border bg-white p-4"><h2 className="mb-4 font-bold">Visitors over time</h2><TrafficChart data={report.daily} /></section>
        <section aria-label="Website order funnel" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Website leads" value={number(report.sales.leads)} note="Public-form submissions created in this period." />
          <Metric label="Confirmed orders" value={number(report.sales.confirmed)} note="Leads from this period converted to orders; includes later cancellations." />
          <Metric label="Lead conversion" value={`${report.leadRate.toFixed(1)}%`} note="Tracked sessions with a lead ÷ tracked sessions." />
          <Metric label="Confirmed conversion" value={`${report.confirmedRate.toFixed(1)}%`} note="Tracked sessions with a confirmed order ÷ tracked sessions." />
          <Metric label="Confirmed order value" value={money(report.sales.confirmedValue)} note="Booked total of confirmed orders, before returns/cancellations." />
          <Metric label="Collected revenue" value={money(report.sales.collectedRevenue)} note="Recorded cash from delivered, collected/settled orders in this cohort." />
          <Metric label="Average confirmed order" value={money(report.averageConfirmedOrder)} note="Complete order total, not price per item or profit." />
          <Metric label="Delivered / cancelled / returned" value={`${report.sales.delivered} / ${report.sales.cancelled} / ${report.sales.returned}`} note="Current outcomes for website leads created in this period." />
        </section>
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-xl border bg-white p-4"><h2 className="mb-3 font-bold">Traffic sources</h2><p className="mb-3 text-xs text-zinc-500">Source of each session. Meta links are not necessarily paid ads.</p>
            {report.sources.length ? <table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="py-2">Source</th><th>Sessions</th><th>Visitors</th></tr></thead><tbody>{report.sources.map((row) => <tr key={row.source} className="border-b"><td className="break-all py-3">{row.source}</td><td>{number(row.sessions)}</td><td>{number(row.visitors)}</td></tr>)}</tbody></table> : <p className="text-sm text-zinc-500">No traffic recorded for this period.</p>}
          </section>
          <section className="overflow-x-auto rounded-xl border bg-white p-4"><h2 className="mb-3 font-bold">Top pages</h2>
            {report.pages.length ? <table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="py-2">Page</th><th>Views</th><th>Visitors</th></tr></thead><tbody>{report.pages.map((row) => <tr key={row.path} className="border-b"><td className="max-w-xs break-all py-3 pr-3">{decodeURIComponent(row.path)}</td><td>{number(row.views)}</td><td>{number(row.visitors)}</td></tr>)}</tbody></table> : <p className="text-sm text-zinc-500">Page views start after the collector is deployed.</p>}
          </section>
        </div>
        <section className="overflow-x-auto rounded-xl border bg-white p-4"><h2 className="mb-3 font-bold">Products by website requests</h2>
          {report.products.length ? <table className="w-full min-w-[500px] text-left text-sm"><thead><tr className="border-b"><th className="py-2">Product</th><th>Leads</th><th>Confirmed</th><th>Confirmed value</th></tr></thead><tbody>{report.products.map((row, index) => <tr key={`${row.title}-${index}`} className="border-b"><td className="py-3 pr-3">{row.title}</td><td>{number(row.leads)}</td><td>{number(row.confirmed)}</td><td>{money(row.value)}</td></tr>)}</tbody></table> : <p className="text-sm text-zinc-500">No website requests in this period.</p>}
        </section>
        <p className="text-xs leading-6 text-zinc-500">Refresh this page for updated numbers. Sales follow leads created during the selected period; outcomes may change later. Conversion rates count only sessions linked to measured page views, so blocked tracking can leave leads unlinked. Unique visitors are browsers, not verified people, and are deduplicated across the whole period. Admin sessions and recognized bots are excluded; bot filtering is approximate. Source visitor counts can overlap. No historical traffic is reconstructed. Traffic data is retained for 90 days.</p>
      </>}
    </main>
  );
}
