'use client';

import { TimePassed } from '@/components/TimePassed';
import { investmentPlanQuery } from '@/queries/investmentPlanQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ClockIcon } from 'lucide-react';
import { Suspense } from 'react';
import { EconomicIndicator } from '../../../components/EconomicIndicator';
import { InfoCard } from '../../../components/InfoCard';
import { StocksList } from './components/StocksList';

function PlanPageContent() {
  const { data: stocks } = useSuspenseQuery(investmentPlanQuery);
  const investmentPlan = stocks.response;

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold">Plan de inversión</h1>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ClockIcon className="w-3 h-3" />
          <span>Generado</span>
          <TimePassed date={investmentPlan.createdAt} />
        </div>
      </div>

      <InfoCard title="Estrategia">
        <div className="px-6 flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-4">
            <EconomicIndicator title="Inversión" value={`$${investmentPlan.investmentAmount}`} />
            <EconomicIndicator
              title="Beneficio"
              value={`${(investmentPlan.expectedProfit * 100).toFixed(2)}%`}
              className="text-green-500"
            />
            <EconomicIndicator
              title="Pérdida"
              value={`${(investmentPlan.expectedLoss * 100).toFixed(2)}%`}
              className="text-red-500"
            />
            <EconomicIndicator title="Duración" value={investmentPlan.timeframe} />
          </div>
          <p className="text-sm text-muted-foreground">{investmentPlan.overallStrategyReasoning}</p>
        </div>
      </InfoCard>

      <StocksList data={investmentPlan.investmentSuggestions} />
    </div>
  );
}

function PlanPageSuspense() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Plan de inversión</h1>
      <p>El plan de inversión se está generando, puede tardar hasta 10 minutos</p>
    </div>
  );
}

export default function PlanPage() {
  return (
    <Suspense fallback={<PlanPageSuspense />}>
      <PlanPageContent />
    </Suspense>
  );
}
