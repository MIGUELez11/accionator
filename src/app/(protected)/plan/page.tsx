'use client';

import { investmentPlanQuery } from '@/queries/investmentPlanQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { InvestmentStrategyCard, PlanHeader, StocksList } from './components';

export default function PlanPage() {
  const { data: stocks } = useSuspenseQuery(investmentPlanQuery(3980));
  const investmentPlan = stocks.response;

  return (
    <div className="p-4 flex flex-col gap-4">
      <PlanHeader title="Plan de inversión" createdAt={investmentPlan.createdAt} />

      <InvestmentStrategyCard
        investmentAmount={investmentPlan.investmentAmount}
        expectedProfit={investmentPlan.expectedProfit}
        expectedLoss={investmentPlan.expectedLoss}
        timeframe={investmentPlan.timeframe}
        overallStrategyReasoning={investmentPlan.overallStrategyReasoning}
      />

      <StocksList data={investmentPlan.investmentSuggestions} />
    </div>
  );
}
