import {
  getDashboardStats,
  getNeedsAttention,
  getRecentActivity,
} from "@/actions/admin/dashboard-actions";
import { DataCard } from "@/components/admin/dashboard/DataCard";
import { NeedsAttentionTable } from "@/components/admin/dashboard/NeedsAttentionTable";
import { RecentActivityFeed } from "@/components/admin/dashboard/RecentActivityFeed";
import { DASHBOARD_LAYOUT } from "@/lib/constants";
import { extractMetrics } from "@/utils/mappers";
import { buildStatCards } from "@/utils/metricsToCards";

export default async function AdminDashboardPage() {
  const rawData = await getDashboardStats();

  console.log(rawData);

  const metrics = extractMetrics(rawData);

  const stats = buildStatCards(metrics, DASHBOARD_LAYOUT);

  const recentActivity = await getRecentActivity(10);

  const needAttentionTableRows = await getNeedsAttention(10);

  return (
    <>
      <div>
        <div className="max-w-7xl mx-auto">
          <DataCard stats={stats} />
          <NeedsAttentionTable rows={needAttentionTableRows} />
          <RecentActivityFeed activity={recentActivity} />
        </div>
      </div>
    </>
  );
}
