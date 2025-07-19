'use client';

import { EconomicIndicator } from '@/components/EconomicIndicator';

interface InvestmentMetricsProps {
  quantityToInvest: number;
  stopLossPrice: number;
  estimatedTime: string;
  estimatedProfitPercentage: number;
  estimatedLossPercentage: number;
  profitProbability: number;
}

export function InvestmentMetrics({
  quantityToInvest,
  stopLossPrice,
  estimatedTime,
  estimatedProfitPercentage,
  estimatedLossPercentage,
  profitProbability,
}: InvestmentMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <EconomicIndicator title="Cantidad" value={`$${quantityToInvest}`} />
      <EconomicIndicator title="Stop Loss" value={`$${stopLossPrice}`} className="text-red-500" />
      <EconomicIndicator title="Duración" value={estimatedTime} className="line-clamp-1" />
      <EconomicIndicator
        title="Beneficio est."
        value={`${(estimatedProfitPercentage * 100).toFixed(2)}%`}
        className="text-green-500"
      />
      <EconomicIndicator
        title="Pérdida est."
        value={`${(estimatedLossPercentage * 100).toFixed(2)}%`}
        className="text-red-500"
      />
      <EconomicIndicator title="Prob. Beneficio" value={`${(profitProbability * 100).toFixed(2)}%`} />
    </div>
  );
}
