// app/(dashboard)/remittances/page.tsx
import {
  getRemittances,
  getRemittanceStats,
} from "@/actions/admin/remittances-actions";
import { AddRemittanceDialog } from "@/components/admin/remittances/AddRemittanceDialog";
import { RemittancesTable } from "@/components/admin/remittances/RemittancesTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, TrendingUp, Wallet } from "lucide-react";

export default async function RemittancesPage() {
  const [remittances, stats] = await Promise.all([
    getRemittances(),
    getRemittanceStats(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">გადარიცხვები</h1>
        <AddRemittanceDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ასაღები თანხები
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.pending.amount.toFixed(2)} ₾
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.pending.count} შეკვეთა
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              თვიური გადარიცხვები
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.thisMonth.amount.toFixed(2)} ₾
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.thisMonth.count} გადარიცხვა
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ჯამური თანხა</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.total.amount.toFixed(2)} ₾
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.total.count} გადარიცხვა
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Remittances Table */}
      <RemittancesTable remittances={remittances} />
    </div>
  );
}
