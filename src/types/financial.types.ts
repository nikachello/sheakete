export interface OrderFinancials {
  revenue: number;
  cogs: number;
  productCost: number;
  shippingFee: number;
  additionalCosts: number;
  grossProfit: number;
  grossMargin: number;
}

export interface PeriodFinancials {
  totalRevenue: number;
  totalCOGS: number;
  grossProfit: number;
  grossMargin: number;
  marketingExpenses: number;
  operatingExpenses: number;
  totalOpEx: number;
  netProfit: number;
  netMargin: number;
  roas: number;
  orderCount: number;
  averageOrderValue: number;
}

export interface FounderLoanSummary {
  totalOwed: number;
  totalRepaid: number;
  currentBalance: number;
  unpaidExpenses: Array<{
    id: string;
    expenseId: string;
    amount: number;
    description: string;
    type: string;
    createdAt: Date;
  }>;
}

export interface BankReconciliation {
  calculated: number;
  expected: number;
  discrepancy: number;
  isBalanced: boolean;
  breakdown: {
    remittances: number;
    expenses: number;
    founderRepayments: number;
  };
}
