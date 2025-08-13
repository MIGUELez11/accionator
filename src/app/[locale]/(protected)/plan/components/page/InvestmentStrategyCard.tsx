'use client';

import { EconomicIndicator } from '@/components/EconomicIndicator';
import { InfoCard } from '@/components/InfoCard';
import { useTranslate } from '@tolgee/react';

interface InvestmentStrategyCardProps {
  investmentAmount: number;
  expectedProfit: number;
  expectedLoss: number;
  timeframe: string;
  overallStrategyReasoning: string;
}

export function InvestmentStrategyCard({
  investmentAmount,
  expectedProfit,
  expectedLoss,
  timeframe,
  overallStrategyReasoning,
}: InvestmentStrategyCardProps) {
  const { t } = useTranslate();

  return (
    <InfoCard title={t('page.plan.strategy')}>
      <div className="px-6 flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          <EconomicIndicator title={t('page.plan.stock.investmentMetrics.quantity')} value={`$${investmentAmount}`} />
          <EconomicIndicator
            title={t('page.plan.stock.investmentMetrics.estimatedProfit')}
            value={`${(expectedProfit * 100).toFixed(2)}%`}
            className="text-green-500"
          />
          <EconomicIndicator
            title={t('page.plan.stock.investmentMetrics.estimatedLoss')}
            value={`${(expectedLoss * 100).toFixed(2)}%`}
            className="text-red-500"
          />
          <EconomicIndicator title={t('page.plan.stock.investmentMetrics.duration')} value={timeframe} />
        </div>
        <p className="text-sm text-muted-foreground">{overallStrategyReasoning}</p>
      </div>
    </InfoCard>
  );
}
