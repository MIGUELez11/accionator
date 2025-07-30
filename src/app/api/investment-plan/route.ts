import { withRequiredUser } from '@/lib/requireUser';
import { withCacheEffect } from '@/server/cache/withCache';
import { generateInvestmentPlan } from '@/server/investmentPlan/generateInvestmentPlan';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { FinnhubStocksService } from '@/server/stocks/data/finnhub/service';
import { StocksService } from '@/server/stocks/data/service';
import { ScreenerService } from '@/server/stocks/screeners/service';
import { TradingViewScreener } from '@/server/stocks/screeners/tradingview/service';
import { Effect } from 'effect';
import { NextResponse } from 'next/server';

export const GET = withRequiredUser(
  withPosthog(async () => {
    const data = await Effect.runPromise(
      withCacheEffect(
        'investmentPlan',
        24 * 60 * 60,
        generateInvestmentPlan().pipe(
          Effect.provideService(ScreenerService, TradingViewScreener),
          Effect.provideService(StocksService, FinnhubStocksService),
        ),
      ),
    );

    return NextResponse.json(data);
  }),
);