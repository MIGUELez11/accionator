'use client';

import { stockInfoQuery } from '@/queries/stockInfoQuery';
import { InvestmentPlanResponse } from '@/server/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AnalysisButton, EntryPriceRange, ExitStrategy, InvestmentMetrics, StockHeader } from './';

export function StockInvestmentPlan({
  plan,
}: {
  plan: InvestmentPlanResponse['response']['investmentSuggestions'][number];
}) {
  const { data: stockInfo } = useSuspenseQuery(stockInfoQuery(plan.symbol));

  return (
    <article
      aria-roledescription={`${plan.symbol} investment plan`}
      className="flex flex-col gap-4 h-full justify-between py-4 border shadow-sm rounded-lg "
    >
      <div className="flex flex-col gap-4 max-h-[452px] overflow-y-auto px-4">
        <StockHeader
          symbol={plan.symbol}
          name={stockInfo.stockProfile.name ?? 'Unknown'}
          ticker={stockInfo.stockProfile.ticker ?? '????'}
          logo={stockInfo.stockProfile.logo}
          price={stockInfo.price.price ?? 0}
          percentChange={stockInfo.price.percentChange}
        />

        <p className="text-sm text-muted-foreground min-h-[80px] max-h-[80px] overflow-y-auto">
          {plan.stockAnalysisSummary}
        </p>

        <EntryPriceRange minPrice={plan.entryPriceMin} maxPrice={plan.entryPriceMax} />

        <InvestmentMetrics
          quantityToInvest={plan.quantityToInvest}
          stopLossPrice={plan.stopLossPrice}
          estimatedTime={plan.estimatedTime}
          estimatedProfitPercentage={plan.estimatedProfitPercentage}
          estimatedLossPercentage={plan.estimatedLossPercentage}
          profitProbability={plan.profitProbability}
        />

        <ExitStrategy strategies={plan.exitStrategy} />
      </div>

      <AnalysisButton symbol={plan.symbol} />
    </article>
  );
}
