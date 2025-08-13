'use client';

import { investmentPlanQuery } from '@/queries/investmentPlanQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslate } from '@tolgee/react';
import { InvestmentStrategyCard, PlanHeader, StocksList } from './components';

const INVESTMENT_AMOUNT = 3980;

export default function PlanPage() {
  const { data: stocks } = useSuspenseQuery(investmentPlanQuery);
  const investmentPlan = stocks.response;
  const { t } = useTranslate();

  return (
    <div className="p-4 flex flex-col gap-4">
      <PlanHeader title={t('page.plan.title')} createdAt={investmentPlan.createdAt} />

      <InvestmentStrategyCard
        investmentAmount={INVESTMENT_AMOUNT}
        expectedProfit={investmentPlan.expectedProfit}
        expectedLoss={investmentPlan.expectedLoss}
        timeframe={investmentPlan.timeframe}
        overallStrategyReasoning={investmentPlan.overallStrategyReasoning}
      />

      <StocksList data={investmentPlan.investmentSuggestions} investmentAmount={INVESTMENT_AMOUNT} />
    </div>
  );
}
