import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrdersTable from "@/components/admin/OrdersTable";
import OrderForm from "@/components/admin/OrderForm";
import { DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { getAdminProducts } from "@/lib/admin-helpers";
import { getOrders } from "@/lib/actions";

export default async function AdminDashboard() {
  const products = await getAdminProducts();

  const orders = await getOrders();

  const totalRevenue = orders
    .filter((o) => o.status === "PAID" || o.status === "CONFIRMED")
    .reduce((acc, curr) => acc + (curr.price ?? 0), 0);

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">მართვა</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="სულ შემოსავალი"
          value={`${totalRevenue} GEL`}
          icon={<DollarSign />}
          color="text-green-600"
        />
        <StatCard
          title="ლიდები"
          value={orders.length}
          icon={<ShoppingCart />}
          color="text-blue-600"
        />
        <StatCard
          title="გაყიდვები"
          value={orders.filter((o) => o.status === "CONFIRMED").length}
          icon={<Package />}
          color="text-purple-600"
        />
        <StatCard
          title="კონვერსია"
          value={`${((orders.filter((o) => o.status === "CONFIRMED").length / orders.length) * 100 || 0).toFixed(1)}%`}
          icon={<Users />}
          color="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <OrderForm products={products} />
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>მომხმარებლები</CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersTable data={orders} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={color}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
