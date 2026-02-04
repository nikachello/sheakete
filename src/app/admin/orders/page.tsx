import { getOrders, getOrdersStats } from "@/actions/admin/order-actions";
import { OrdersStatsCards } from "@/components/admin/orders/OrdersStatsCard";
import { OrdersTable } from "@/components/admin/orders/table/Table";
import { ordersStatsToCards } from "@/utils/orders/mappers";

export default async function LeadsPage() {
  const orders = await getOrders();

  const stats = await getOrdersStats();

  // Transform into stat cards
  const statCards = ordersStatsToCards(stats);

  return (
    <div className="flex min-h-screen bg-zinc-50/50">
      <main className="flex-1 pt-20 lg:pt-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">შეკვეთები</h1>
          </div>
          <OrdersStatsCards cards={statCards} />

          {/* Filters and Table */}
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
            <OrdersTable orders={orders} />
          </div>
        </div>
      </main>
    </div>
  );
}
