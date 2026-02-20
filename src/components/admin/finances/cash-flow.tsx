import { DailyProjection } from "@/services/financial/cash-flow-procetion.service";

export function CashFlowSummaryCards({ data, currentBalance }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        label="Current Balance"
        value={`${currentBalance?.toFixed(2)} GEL`}
      />
      <StatCard
        label="Lowest Projected"
        value={`${data?.lowestBalance.toFixed(2)} GEL`}
        // Turn red if below 500
        className={data?.lowestBalance < 500 ? "border-red-400" : ""}
        sublabel={`on ${data?.lowestBalanceDate.toLocaleDateString()}`}
      />
      <StatCard
        label="Expected Inflows"
        value={`${data?.totalExpectedInflows.toFixed(2)} GEL`}
      />
      <StatCard
        label="Inventory Commitments"
        value={`${data?.totalExpectedOutflows.toFixed(2)} GEL`}
      />
    </div>
  );
}

// components/finances/cash-flow-chart.tsx
// Use recharts BarChart — color bars by warningLevel
export function CashFlowChart({
  projections,
}: {
  projections: DailyProjection[];
}) {
  const data = projections.map((p) => ({
    date: p.date.toLocaleDateString(),
    balance: p.closingBalance,
    fill:
      p.warningLevel === "danger"
        ? "#ef4444"
        : p.warningLevel === "caution"
          ? "#f59e0b"
          : "#22c55e",
  }));

  return (
    <BarChart width={800} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      {/* Reference lines for thresholds */}
      <ReferenceLine
        y={500}
        stroke="#f59e0b"
        strokeDasharray="3 3"
        label="Caution"
      />
      <ReferenceLine
        y={150}
        stroke="#ef4444"
        strokeDasharray="3 3"
        label="Danger"
      />
      <Bar dataKey="balance">
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );
}
