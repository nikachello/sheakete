import { getLeads, getLeadsStats } from "@/actions/admin/leads-actions";
import { LeadsStatsCards } from "@/components/admin/leads/LeadsStatsCard";
import { LeadsTable } from "@/components/admin/leads/table/Table";
import { leadsStatsToCards } from "@/utils/leads/mapper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LeadsPage() {
  // Fetch leads statistics
  const stats = await getLeadsStats();

  // Transform into stat cards
  const statCards = leadsStatsToCards(stats);

  const leads = await getLeads();

  return (
    <div className="flex min-h-screen bg-zinc-50/50">
      <main className="flex-1 pt-20 lg:pt-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">ლიდები</h1>
          </div>

          {/* Stats Cards */}
          <LeadsStatsCards cards={statCards} />

          {/* Filters and Table */}
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
            <LeadsTable leads={leads} />
          </div>
        </div>
      </main>
    </div>
  );
}
