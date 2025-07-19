'use client';

import { EconomicIndicator } from '@/components/EconomicIndicator';
import { InfoCard } from '@/components/InfoCard';

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
  return (
    <InfoCard title="Estrategia">
      <div className="px-6 flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          <EconomicIndicator title="Inversión" value={`$${investmentAmount}`} />
          <EconomicIndicator
            title="Beneficio"
            value={`${(expectedProfit * 100).toFixed(2)}%`}
            className="text-green-500"
          />
          <EconomicIndicator title="Pérdida" value={`${(expectedLoss * 100).toFixed(2)}%`} className="text-red-500" />
          <EconomicIndicator title="Duración" value={timeframe} />
        </div>
        <p className="text-sm text-muted-foreground">{overallStrategyReasoning}</p>
      </div>
    </InfoCard>
  );
}
