import { withRequiredUser } from '@/lib/requireUser';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { FinnhubCachedStocksService } from '@/server/stocks/data/finnhub/service';
import { Effect } from 'effect';
import { NextResponse } from 'next/server';

export const GET = withRequiredUser(
  withPosthog(async (request) => {
    const symbol = request.nextUrl.searchParams.get('symbol');
    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    try {
      const stockService = await Effect.runPromise(FinnhubCachedStocksService);
      const stockInfo = await Effect.runPromise(stockService.getStockProfile(symbol));

      return NextResponse.json(stockInfo);
    } catch {
      return NextResponse.json({ error: 'Failed to fetch stock info' }, { status: 500 });
    }
  }),
);
