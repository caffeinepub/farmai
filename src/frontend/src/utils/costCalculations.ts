export interface CostInput {
  cropType: string;
  landArea: number;
  seeds: number;
  fertilizers: number;
  labor: number;
  irrigation: number;
  equipment: number;
}

export interface CostBreakdownItem {
  category: string;
  amount: number;
  percentage: number;
}

export interface CostBreakdown {
  items: CostBreakdownItem[];
  total: number;
}

export function calculateCost(input: CostInput): CostBreakdown {
  const total = input.seeds + input.fertilizers + input.labor + input.irrigation + input.equipment;

  const items: CostBreakdownItem[] = [
    {
      category: 'Seeds',
      amount: input.seeds,
      percentage: (input.seeds / total) * 100,
    },
    {
      category: 'Fertilizers',
      amount: input.fertilizers,
      percentage: (input.fertilizers / total) * 100,
    },
    {
      category: 'Labor',
      amount: input.labor,
      percentage: (input.labor / total) * 100,
    },
    {
      category: 'Irrigation',
      amount: input.irrigation,
      percentage: (input.irrigation / total) * 100,
    },
    {
      category: 'Equipment',
      amount: input.equipment,
      percentage: (input.equipment / total) * 100,
    },
  ];

  return {
    items,
    total,
  };
}
