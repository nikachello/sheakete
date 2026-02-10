import { getDashboardStats } from "@/actions/admin/dashboard-actions";
import { getFounderLoanBalance } from "@/actions/admin/expenses-actions";
import { getCurrentBankBalance } from "@/actions/admin/financials-actions";
import { getLowStockAlerts } from "@/actions/admin/stock-actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Order } from "prisma/generated/prisma/client";

export default async function DashboardPage() {
  const [stats, founderLoan, bankBalance, stockAlerts] = await Promise.all([
    getDashboardStats(),
    getFounderLoanBalance(),
    getCurrentBankBalance(),
    getLowStockAlerts(),
  ]);

  // --- Guard against missing dashboard data ---
  if (!stats.success || !stats.data) {
    return <div>Error loading dashboard</div>;
  }

  const { monthProfit, needsAttention } = stats.data;

  // --- Critical stock alerts ---
  const criticalStockAlerts =
    stockAlerts.data?.filter((a) => a.severity === "CRITICAL") || [];

  // --- Bank balance safely ---
  const currentBankBalance =
    bankBalance.success && bankBalance.data ? bankBalance.data : 0;

  // --- Founder loan safely ---
  const showFounderLoanAlert =
    founderLoan.success &&
    founderLoan.data &&
    founderLoan.data.currentBalance > 0;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">დეშბორდი</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">შემოსავალი</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₾{monthProfit.totalRevenue.toFixed(2)}
            </div>
            <div className="text-sm text-green-600">
              {monthProfit.grossMargin.toFixed(1)}% მარჟა
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">
              წმინდა მოგება
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₾{monthProfit.netProfit.toFixed(2)}
            </div>
            <div className="text-sm text-green-600">
              {monthProfit.netMargin.toFixed(1)}% მარჟა
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">ROAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthProfit.roas.toFixed(1)}x
            </div>
            <div className="text-sm text-gray-600">
              მარკეტინგი: ₾{monthProfit.marketingExpenses.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">
              ხელმისაწვდომი თანხა
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₾{currentBankBalance.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Founder Loan Alert */}
      {showFounderLoanAlert && founderLoan.data && (
        <Alert>
          <AlertTitle>მფლობელის ვალი</AlertTitle>
          <AlertDescription>
            კომპანიას აქვს მფლობელის ვალი: ₾
            {founderLoan.data.currentBalance.toFixed(2)}
            <br />
            {founderLoan.data.unpaidExpenses.length} გადაუხდელი ხარჯი
          </AlertDescription>
        </Alert>
      )}

      {/* Critical Stock Alerts */}
      {criticalStockAlerts.length > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Critical Stock Alerts</AlertTitle>
          <AlertDescription>
            {criticalStockAlerts.length} პროდუქტი მცირე მარაგია ან ამოწურულია
          </AlertDescription>
        </Alert>
      )}

      {/* Needs Attention Orders */}
      {needsAttention.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>საყურადღებო</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {needsAttention.map((order: Order) => (
                <div
                  key={order.id}
                  className="flex justify-between border-b pb-2"
                >
                  <div>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-sm text-gray-600">
                      {order.status} - {order.productTitle}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
