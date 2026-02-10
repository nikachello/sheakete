import {
  getFinancialsData,
  getCurrentBankBalance,
} from "@/actions/admin/financials-actions";
import { getFounderLoanBalance } from "@/actions/admin/expenses-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  CreditCard,
  TrendingDown as Loss,
  Package,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GEL",
  }).format(amount);
}

function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

function MetricCard({
  title,
  value,
  previousValue,
  icon: Icon,
  valueColor,
}: {
  title: string;
  value: number;
  previousValue?: number;
  icon: any;
  valueColor?: string;
}) {
  const percentageChange =
    previousValue !== undefined
      ? calculatePercentageChange(value, previousValue)
      : null;
  const isPositive = percentageChange && percentageChange > 0;
  const isNegative = percentageChange && percentageChange < 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor || ""}`}>
          {formatCurrency(value)}
        </div>
        {percentageChange !== null && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {isPositive && (
              <>
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">
                  +{percentageChange.toFixed(1)}%
                </span>
              </>
            )}
            {isNegative && (
              <>
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                <span className="text-red-500">
                  {percentageChange.toFixed(1)}% " "
                </span>
              </>
            )}
            {!isPositive && !isNegative && <span>არ არის ცვლილება</span>}
            <span className="ml-1">წინა თვე</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default async function FinancialsPage() {
  const [financialsResult, bankBalanceResult, founderLoanResult] =
    await Promise.all([
      getFinancialsData(),
      getCurrentBankBalance(),
      getFounderLoanBalance(),
    ]);

  if (
    !financialsResult.success ||
    !financialsResult.data ||
    !bankBalanceResult.success ||
    !bankBalanceResult.data
  ) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-500">მონაცემები არ ჩაიტვირთა</div>
      </div>
    );
  }

  const { current, previous, bankWithPending } = financialsResult.data;
  const bankBalance = bankBalanceResult.data;
  const founderLoanData =
    founderLoanResult.success && founderLoanResult.data
      ? founderLoanResult.data
      : null;
  const founderLoanBalance = founderLoanData?.currentBalance ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Overview</h1>
        <p className="text-sm text-muted-foreground">
          მიმდინარე თვის შედარება წინა თვესთან
        </p>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="მთლიანი შემოსავალი"
          value={current.totalRevenue}
          previousValue={previous.totalRevenue}
          icon={DollarSign}
        />
        <MetricCard
          title="წმინდა მოგება"
          value={current.netProfit}
          previousValue={previous.netProfit}
          icon={TrendingUp}
          valueColor={
            current.netProfit >= 0 ? "text-green-600" : "text-red-600"
          }
        />
        <MetricCard title="ბანკის ანგარიში" value={bankBalance} icon={Wallet} />
        <MetricCard
          title="მფლობელის ვალი"
          value={founderLoanBalance}
          icon={CreditCard}
          valueColor="text-orange-600"
        />
      </div>

      {/* Key Financial Ratios */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">მთლიანი მარჟა</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {current.grossMargin.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              შემოსავალი პროდუქტების ფასის შემდეგ
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">წმინდა მარჯა</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {current.netMargin.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              მოგება ყველა ხარჯის შემდეგ
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ROAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{current.roas.toFixed(2)}x</div>
            <p className="text-xs text-muted-foreground mt-1">
              მოგება რეკლამის ხარჯზე
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              საშუალო შეკვეთის საფასური
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(current.averageOrderValue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {current.orderCount} შეკვეთა
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Month Details */}
        <Card>
          <CardHeader>
            <CardTitle>მიმდინარე თვის მოგება-ხარჯები</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">შემოსავალი</span>
              <span className="text-sm font-bold text-green-600">
                {formatCurrency(current.totalRevenue)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                თვითღირებულება (საკურიეროს და დამატებითი ხარჯების ჩათვლით)
              </span>
              <span className="text-sm font-bold text-red-500">
                -{formatCurrency(current.totalCOGS)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm font-semibold">მოგება</span>
              <span className="text-sm font-bold">
                {formatCurrency(current.grossProfit)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">მარკეტინგი</span>
              <span className="text-sm font-bold text-red-500">
                -{formatCurrency(current.marketingExpenses)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">საოპერაციო ხარჯები</span>
              <span className="text-sm font-bold text-red-500">
                -{formatCurrency(current.operatingExpenses)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">წმინდა მოგება</span>
              <span
                className={`font-bold ${
                  current.netProfit >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(current.netProfit)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Previous Month Details */}
        <Card>
          <CardHeader>
            <CardTitle>წინა თვის მოგება-ხარჯები</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">შემოსავალი</span>
              <span className="text-sm font-bold text-green-600">
                {formatCurrency(previous.totalRevenue)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                თვითღირებულება (საკურიეროს და დამატებითი ხარჯების ჩათვლით)
              </span>
              <span className="text-sm font-bold text-red-500">
                -{formatCurrency(previous.totalCOGS)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm font-semibold">მოგება</span>
              <span className="text-sm font-bold">
                {formatCurrency(previous.grossProfit)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">მარკეტინგი</span>
              <span className="text-sm font-bold text-red-500">
                -{formatCurrency(previous.marketingExpenses)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">საოპერაციო ხარჯები</span>
              <span className="text-sm font-bold text-red-500">
                -{formatCurrency(previous.operatingExpenses)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">წმინდა მოგება</span>
              <span
                className={`font-bold ${
                  previous.netProfit >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatCurrency(previous.netProfit)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bank & Cash Position */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bank Account Status */}
        <Card>
          <CardHeader>
            <CardTitle>Bank Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">მიმდინარე ბალანსი</span>
              <span className="text-lg font-bold">
                {formatCurrency(bankBalance)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                ასაღები თანხები (კურიერები)
              </span>
              <span className="text-sm font-semibold text-blue-500">
                +{formatCurrency(bankWithPending.pendingCollections)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">ჯამი (ასაღები თანხებიანად)</span>
              <span className="text-lg font-bold text-green-600">
                {formatCurrency(bankWithPending.totalIncludingPending)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Founder Loan Status */}
        <Card>
          <CardHeader>
            <CardTitle>Founder Loan Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">ვალი</span>
              <span className="text-lg font-bold text-orange-600">
                {formatCurrency(founderLoanBalance)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              რაც კომპანიამ უნდა დაუბრუნოს მფლობელს
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Month-over-Month Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>ცვლილებები თვიდან თვემდე</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                შემოსავალი
              </div>
              <div
                className={`text-lg font-semibold ${
                  current.totalRevenue >= previous.totalRevenue
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatCurrency(current.totalRevenue - previous.totalRevenue)} (
                {calculatePercentageChange(
                  current.totalRevenue,
                  previous.totalRevenue
                ).toFixed(1)}
                %)
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">მოგება</div>
              <div
                className={`text-lg font-semibold ${
                  current.grossProfit >= previous.grossProfit
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatCurrency(current.grossProfit - previous.grossProfit)} (
                {calculatePercentageChange(
                  current.grossProfit,
                  previous.grossProfit
                ).toFixed(1)}
                %)
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                წმინდა მოგება
              </div>
              <div
                className={`text-lg font-semibold ${
                  current.netProfit >= previous.netProfit
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatCurrency(current.netProfit - previous.netProfit)} (
                {calculatePercentageChange(
                  current.netProfit,
                  previous.netProfit
                ).toFixed(1)}
                %)
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  მარკეტინგის ხარჯი
                </div>
                <div
                  className={`text-lg font-semibold ${
                    current.marketingExpenses <= previous.marketingExpenses
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formatCurrency(
                    current.marketingExpenses - previous.marketingExpenses
                  )}{" "}
                  (
                  {calculatePercentageChange(
                    current.marketingExpenses,
                    previous.marketingExpenses
                  ).toFixed(1)}
                  %)
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  საოპერაციო ხარჯები
                </div>
                <div
                  className={`text-lg font-semibold ${
                    current.operatingExpenses <= previous.operatingExpenses
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formatCurrency(
                    current.operatingExpenses - previous.operatingExpenses
                  )}{" "}
                  (
                  {calculatePercentageChange(
                    current.operatingExpenses,
                    previous.operatingExpenses
                  ).toFixed(1)}
                  %)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
