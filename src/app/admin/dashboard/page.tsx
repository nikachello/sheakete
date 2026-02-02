import { DataCard } from "@/components/admin/DataCard";
import { NeedsAttentionTable } from "@/components/admin/NeedsAttentionTable";
import { RecentActivityFeed } from "@/components/admin/RecentActivityFeed";
import { Sidebar } from "@/components/admin/sidebar/Sidebar";
import {
  getDashboardStats,
  getNeedsAttention,
  getRecentActivity,
} from "@/lib/admin-actions";
import { DASHBOARD_LAYOUT } from "@/lib/constants";
import { extractMetrics, metricsToStatCards } from "@/utils/mappers";
import { buildStatCards } from "@/utils/metricsToCards";

export default async function AdminDashboardPage() {
  // Step 1: Fetch raw aggregated data from database
  const rawData = await getDashboardStats();

  console.log(rawData);

  // Step 2: Transform raw data into meaningful business metrics
  const metrics = extractMetrics(rawData);

  // Step 3: Format metrics into display-ready stat cards
  // const stats = metricsToStatCards(metrics);
  const stats = buildStatCards(metrics, DASHBOARD_LAYOUT);

  const recentActivity = await getRecentActivity(10);

  const needAttentionTableRows = await getNeedsAttention(10);

  return (
    <div className="flex min-h-screen bg-zinc-50/50">
      <Sidebar />

      <main className="flex-1 pt-20 lg:pt-10">
        {/* 
          pt-20 on mobile to clear the absolute hamburger button
          lg:pt-10 on desktop for normal spacing
        */}
        <div className="max-w-7xl mx-auto px-6">
          <DataCard stats={stats} />
          <NeedsAttentionTable rows={needAttentionTableRows} />
          <RecentActivityFeed activity={recentActivity} />
        </div>
      </main>
    </div>
  );
}
