import { getOrders, getOrdersStats } from "@/actions/admin/order-actions";
import { AddOrderDialog } from "@/components/admin/orders/AddNewOrderDialog";
import { OrdersStatsCards } from "@/components/admin/orders/OrdersStatsCard";
import { OrdersTable } from "@/components/admin/orders/table/Table";
import { ordersStatsToCards } from "@/utils/orders/mappers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LeadsPage() {
  const orders = await getOrders();

  const stats = await getOrdersStats();

  // Transform into stat cards
  const statCards = ordersStatsToCards(stats);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-6">
      <OrdersStatsCards cards={statCards} />

      {/* Filters and Table */}
      <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
        <OrdersTable orders={orders} />
      </div>
      <div className="mb-6">
        <AddOrderDialog />
      </div>
    </div>
  );
}
