import {
  getExpensesByMonth,
  getExpenseStats,
  getFounderLoanBalance,
} from "@/actions/admin/expenses-actions";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExpenseList } from "@/components/admin/expenses/expense-list";
import {
  getExpenseBreakdown,
  getExpenseTrends,
} from "@/actions/admin/expenses-analytics-actions";
import { ExpenseForm } from "@/components/admin/expenses/expense-form";
import { ExpenseChart } from "@/components/admin/expenses/expense-chart";
import { PayOwnerDialog } from "@/components/admin/expenses/PayOwnerDialog";

export const dynamic = "force-dynamic";

export default async function ExpensesPage() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [expenses, stats, founderLoan, breakdown, trends] = await Promise.all([
    getExpensesByMonth(month, year),
    getExpenseStats(month, year),
    getFounderLoanBalance(),
    getExpenseBreakdown(month, year),
    getExpenseTrends(6),
  ]);

  if (
    !stats.success ||
    !stats.data ||
    !founderLoan.success ||
    !founderLoan.data ||
    !breakdown.success ||
    !breakdown.data ||
    !trends.success ||
    !trends.data ||
    !expenses.success ||
    !expenses.data
  ) {
    return <div>მოხდა შეცდომა</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">ხარჯები</h1>
        <ExpenseForm />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">
              ჯამური ხარჯები
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₾{stats.data.totalAmount.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">
              {stats.data.count} ხარჯი
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">მარკეტინგი</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₾{stats.data.marketingAmount.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">
              {stats.data.totalAmount > 0
                ? (
                    (stats.data.marketingAmount / stats.data.totalAmount) *
                    100
                  ).toFixed(1)
                : "0.0"}
              %-დან
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">საოპერაციო</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₾
              {(stats.data.totalAmount - stats.data.marketingAmount).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">
              ქირა, ხელფასი, პროგრამები
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">
              დამფუძნებლის ვალი
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₾
              {founderLoan.success
                ? founderLoan.data.currentBalance.toFixed(2)
                : "0.00"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Founder Loan Alert */}
      {founderLoan.success && founderLoan.data.currentBalance > 0 && (
        <Alert>
          <AlertTitle>🔴 მფლობელის მიმართ ვალი</AlertTitle>
          <AlertDescription>
            <div className="space-y-2 mt-2">
              <div>
                ვალი:{" "}
                <strong>₾{founderLoan.data.currentBalance.toFixed(2)}</strong>
              </div>
              <div className="mt-4">
                <PayOwnerDialog />
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Expense Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>დეტალურად</CardTitle>
          </CardHeader>
          <CardContent>
            {breakdown.success && (
              <div className="space-y-3">
                {breakdown.data.map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      <div>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm text-gray-600">
                          {item.count} ხარჯი
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₾{item.amount.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">
                        {item.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6-თვის ტრენდი</CardTitle>
          </CardHeader>
          <CardContent>
            {trends.success && <ExpenseChart data={trends.data} />}
          </CardContent>
        </Card>
      </div>

      {/* Expense List */}
      <Card>
        <CardHeader>
          <CardTitle>ბოლო ხარჯები</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.success && <ExpenseList expenses={expenses.data} />}
        </CardContent>
      </Card>
    </div>
  );
}
