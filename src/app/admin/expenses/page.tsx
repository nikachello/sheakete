import {
  getExpensesByMonth,
  getExpenseStats,
} from "@/actions/admin/expenses-actions";
import { AddExpenseDialog } from "@/components/admin/expenses/AddExpenseDialog";
import { ExpensesTable } from "@/components/admin/expenses/Table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, TrendingDown, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ExpensesPage() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [expenses, stats] = await Promise.all([
    getExpensesByMonth(month, year),
    getExpenseStats(month, year),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              მთლიანი ხარჯები
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAmount} ₾</div>
            <p className="text-xs text-muted-foreground">ამ თვეში</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">მარკეტინგი</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.marketingAmount} ₾</div>
            <p className="text-xs text-muted-foreground">რეკლამა</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              საკურიეროს ხარჯები
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.courierAmount} ₾</div>
            <p className="text-xs text-muted-foreground">საკურიერო</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              სხვა ხარჯები (საკურიერო)
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.additionalFeesTotal.toFixed(2)} ₾
            </div>
            <p className="text-xs text-muted-foreground">სხვა ხარჯები</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              ჩანაწერების რაოდენობა
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.count}</div>
            <p className="text-xs text-muted-foreground">ამ თვეში</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <ExpensesTable expenses={expenses} />

      {/* Add Expense */}
      <div className="mb-6">
        <AddExpenseDialog />
      </div>
    </div>
  );
}
