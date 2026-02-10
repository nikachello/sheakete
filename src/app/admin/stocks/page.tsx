import {
  getStockLevels,
  getLowStockAlerts,
} from "@/actions/admin/stock-actions";
import { getABCAnalysis } from "@/actions/admin/stock-analytics-actions";
import { ABCGrid } from "@/components/admin/stocks/abc-grid";
import { AddStockDialog } from "@/components/admin/stocks/AddStockDialog";
import { StockAlerts } from "@/components/admin/stocks/stock-alerts";
import { StockList } from "@/components/admin/stocks/stock-list";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function StocksPage() {
  const [stocks, alerts, abcData] = await Promise.all([
    getStockLevels(),
    getLowStockAlerts(),
    getABCAnalysis(3),
  ]);

  if (
    !stocks.success ||
    !stocks.data ||
    !alerts.success ||
    !alerts.data ||
    !abcData.success ||
    !abcData.data
  ) {
    return <div>მოხდა შეცდომა</div>;
  }

  const totalValue = stocks.data.reduce(
    (sum, s) => sum + (s.quantityOnHand || 0) * (s.averageCost || 0),
    0
  );

  const lowStockCount = stocks.data.filter(
    (s) => (s.quantityOnHand || 0) <= 10
  ).length;
  const outOfStockCount = stocks.data.filter(
    (s) => (s.quantityOnHand || 0) === 0
  ).length;

  return (
    <div className="space-y-6 p-6 w-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">მარაგი</h1>
        <div className="self-end">
          <AddStockDialog />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">
              ჯამში პროდუქტები
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stocks.data.length}</div>
            <div className="text-sm text-gray-600">რომლებსაც ვითვლით</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">
              მარაგის ღირებულება
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₾{totalValue.toFixed(2)}</div>
            <div className="text-sm text-gray-600">ფასი</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">
              დაბალი მარაგი
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {lowStockCount}
            </div>
            <div className="text-sm text-gray-600">≤10 ცალი</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">ამოწურული</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {outOfStockCount}
            </div>
            <div className="text-sm text-gray-600">ამოყიდული</div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Alerts */}
      {alerts.success && alerts.data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>⚠️ მარაგის შეხსენება ({alerts.data.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <StockAlerts alerts={alerts.data} />
          </CardContent>
        </Card>
      )}

      {/* ABC Analysis */}
      {abcData.success && (
        <Card>
          <CardHeader>
            <CardTitle>ABC ანალიზი (ბოლო 3 თვის)</CardTitle>
          </CardHeader>
          <CardContent>
            <ABCGrid data={abcData.data} />
          </CardContent>
        </Card>
      )}

      {/* Stock List */}
      <Card>
        <CardHeader>
          <CardTitle>ყველა პროდუქტი</CardTitle>
        </CardHeader>
        <CardContent>
          <StockList stocks={stocks.data} />
        </CardContent>
      </Card>
    </div>
  );
}
