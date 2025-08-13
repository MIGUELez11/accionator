'use client';

import { EconomicIndicator } from '@/components/EconomicIndicator';
import { useTranslate } from '@tolgee/react';

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
  const { t } = useTranslate();

  return (
    <div className="grid grid-cols-3 gap-2">
      <EconomicIndicator title={t('page.plan.stock.investmentMetrics.quantity')} value={`$${quantityToInvest}`} />
      <EconomicIndicator
        title={t('page.plan.stock.investmentMetrics.stopLoss')}
        value={`$${stopLossPrice}`}
        className="text-red-500"
      />
      <EconomicIndicator
        title={t('page.plan.stock.investmentMetrics.duration')}
        value={estimatedTime}
        className="line-clamp-1"
      />
      <EconomicIndicator
        title={t('page.plan.stock.investmentMetrics.estimatedProfit')}
        value={`${(estimatedProfitPercentage * 100).toFixed(2)}%`}
        className="text-green-500"
      />
      <EconomicIndicator
        title={t('page.plan.stock.investmentMetrics.estimatedLoss')}
        value={`${(estimatedLossPercentage * 100).toFixed(2)}%`}
        className="text-red-500"
      />
      <EconomicIndicator
        title={t('page.plan.stock.investmentMetrics.profitProbability')}
        value={`${(profitProbability * 100).toFixed(2)}%`}
      />
    </div>
  );
}
