export interface ProfitInput {
  cultivationCost: number;
  yieldQuantity: number;
  marketPrice: number;
}

export interface ProfitResult {
  revenue: number;
  profit: number;
  profitMargin: number;
}

export function calculateProfit(input: ProfitInput): ProfitResult {
  const revenue = input.yieldQuantity * input.marketPrice;
  const profit = revenue - input.cultivationCost;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

  return {
    revenue,
    profit,
    profitMargin,
  };
}
