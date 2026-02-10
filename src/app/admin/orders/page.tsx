import { getOrders, getOrdersStats } from "@/actions/admin/orders-actions";
import { AddOrderDialog } from "@/components/admin/orders/AddNewOrderDialog";
import { OrdersStatCard } from "@/components/admin/orders/OrderStatCard";
import { OrdersTable } from "@/components/admin/orders/table/Table";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const [ordersRes, statsRes] = await Promise.all([
    getOrders(),
    getOrdersStats(),
  ]);

  if (!ordersRes.success || !ordersRes.data) {
    throw new Error("Failed to load orders");
  }

  if (!statsRes.success || !statsRes.data) {
    throw new Error("Failed to load stats");
  }

  const stats = statsRes.data;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      {/* SERVER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <OrdersStatCard title="გასაგზავნი" value={stats.readyToShip.count} />
        <OrdersStatCard title="გზაში" value={stats.inTransit.count} />
        <OrdersStatCard
          title="მიწოდებული (თვე)"
          value={stats.thisMonthDelivered}
        />
        <OrdersStatCard title="ყველა" value={ordersRes.data.length} />
      </div>

      {/* CLIENT TABLE */}
      <OrdersTable orders={ordersRes.data} />
      <AddOrderDialog />
    </div>
  );
}
