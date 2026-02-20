import { getCashFlowForecast } from "@/actions/admin/financials-actions";

export default async function CashFlowPage() {
  const result = await getCashFlowForecast(60);
  return (
    <>
      <CashFlowSummaryCards
        data={result.data?.summary}
        currentBalance={result.data?.currentBankBalance}
      />
      <CashFlowChart projections={result.data?.projections} />
    </>
  );
}
