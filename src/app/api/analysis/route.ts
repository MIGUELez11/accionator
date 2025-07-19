import { withRequiredUser } from '@/lib/requireUser';
import { getStockAnalysis } from '@/server/analysis/getStockAnalysis';
import { withCacheEffect } from '@/server/cache/withCache';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { FinnhubCachedStocksService } from '@/server/stocks/data/finnhub/service';
import { StocksService } from '@/server/stocks/data/service';
import { Effect } from 'effect';
import { NextResponse } from 'next/server';

export const GET = withRequiredUser(
  withPosthog(async (request) => {
    try {
      const { searchParams } = new URL(request.url);

      const symbol = searchParams.get('symbol');
      if (!symbol) {
        throw new Error('Symbol is required');
      }

      const stockService = await Effect.runPromise(FinnhubCachedStocksService);
      const getFinnhubAnalysis = Effect.provideService(getStockAnalysis(symbol), StocksService, stockService);
      const getCachedAnalysis = withCacheEffect(`ai-analysis:${symbol}`, 60 * 60 * 24 * 7, getFinnhubAnalysis);
      const response = await Effect.runPromise(getCachedAnalysis);

      return NextResponse.json(response);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }),
);
