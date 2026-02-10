import {
  getRemittances,
  getCollectedOrders,
} from "@/actions/admin/remittances-actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreateRemittanceForm } from "@/components/admin/remittances/create-remittance-form";
import { CollectedOrdersList } from "@/components/admin/remittances/collected-orders-list";
import { RemittanceList } from "@/components/admin/remittances/remittance-list";

export const dynamic = "force-dynamic";

export default async function RemittancesPage() {
  const [remittances, collectedOrders] = await Promise.all([
    getRemittances(),
    getCollectedOrders(),
  ]);

  if (
    !remittances.success ||
    !remittances.data ||
    !collectedOrders.success ||
    !collectedOrders.data
  ) {
    return <div>მოხდა შეცდომა</div>;
  }

  const totalPending = collectedOrders.data.reduce(
    (sum, order) => sum + (order.actualPaidPrice || 0),
    0
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">გადარიცხვები </h1>
        <CreateRemittanceForm collectedOrders={collectedOrders.data} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">
              ასაღები თანხები
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₾{totalPending.toFixed(2)}</div>
            <div className="text-sm text-gray-600">
              {collectedOrders.data.length} შეკვეთა მზად
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">
              სულ ჩარიცხვები
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{remittances.data.length}</div>
            <div className="text-sm text-gray-600">სულ</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">ამ თვის</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                remittances.data.filter((r) => {
                  const date = new Date(r.createdAt);
                  const now = new Date();
                  return (
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </div>
            <div className="text-sm text-gray-600">ჩარიცხვები</div>
          </CardContent>
        </Card>
      </div>

      {/* Collected Orders Waiting for Remittance */}
      {collectedOrders.data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              ⚠️ ჩასარიცხები ({collectedOrders.data.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CollectedOrdersList orders={collectedOrders.data} />
          </CardContent>
        </Card>
      )}

      {/* Remittance History */}
      <Card>
        <CardHeader>
          <CardTitle>ჩარციხვების ისტორია</CardTitle>
        </CardHeader>
        <CardContent>
          {remittances.success && (
            <RemittanceList remittances={remittances.data} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
