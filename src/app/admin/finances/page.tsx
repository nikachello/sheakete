import {
  getFinancialsData,
  getRemittancesSummary,
  getRevenueBreakdown,
  getTopProducts,
} from "@/actions/admin/finance-actions";
import { FinancialsMetrics } from "@/components/admin/finances/FinancesMetrics";
import { RevenueChart } from "@/components/admin/finances/RevenueChart";
import { PaymentStatusBreakdown } from "@/components/admin/finances/PaymentStatusBreakdown";
import { ProfitMarginCard } from "@/components/admin/finances/ProfitMarginCard";
import { TopProductsTable } from "@/components/admin/finances/TopProductsTable";
import { RemittancesTable } from "@/components/admin/finances/RemittancesTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FinancialsPage() {
  // Fetch all financial data in parallel
  const [financialsData, revenueBreakdown, topProducts, remittancesSummary] =
    await Promise.all([
      getFinancialsData(),
      getRevenueBreakdown(),
      getTopProducts(10),
      getRemittancesSummary(10),
    ]);

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      {/* Main Metrics Cards */}
      <FinancialsMetrics data={financialsData} />

      {/* Charts and Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RevenueChart data={revenueBreakdown} />
        </div>

        {/* Payment Status Breakdown - Takes 1 column */}
        <div className="lg:col-span-1">
          <PaymentStatusBreakdown data={financialsData.paymentBreakdown} />
        </div>
      </div>

      {/* Profit Margin Overview */}
      <ProfitMarginCard data={financialsData.profitMetrics} />

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products by Revenue */}
        <TopProductsTable products={topProducts} />

        {/* Recent Remittances */}
        <RemittancesTable remittances={remittancesSummary} />
      </div>
    </div>
  );
}
