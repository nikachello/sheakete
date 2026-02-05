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
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      {/* Stats Cards */}
      <LeadsStatsCards cards={statCards} />

      {/* Filters and Table */}
      <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
