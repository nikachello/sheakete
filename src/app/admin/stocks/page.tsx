// app/(dashboard)/stocks/page.tsx
import { getStockLevels, getStockStats } from "@/actions/admin/stock-actions";
import { AddStockDialog } from "@/components/admin/stocks/AddStockDialog";
import { StocksTable } from "@/components/admin/stocks/Table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StocksPage() {
  const [stocks, stats] = await Promise.all([
    getStockLevels(),
    getStockStats(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              სულ პროდუქტები
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalQuantity} ერთეული
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">დაბალი მარაგი</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lowStockCount}</div>
            <p className="text-xs text-muted-foreground">
              10 ან ნაკლები ერთეული
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              კვირის მოძრაობები
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentMovements}</div>
            <p className="text-xs text-muted-foreground">ბოლო 7 დღე</p>
          </CardContent>
        </Card>
      </div>

      {/* Stocks Table */}
      <StocksTable stocks={stocks} />
      <div className="mb-6">
        <AddStockDialog />
      </div>
    </div>
  );
}
