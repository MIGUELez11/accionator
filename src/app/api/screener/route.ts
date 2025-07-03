import { withRequiredUser } from '@/lib/requireUser';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { getScreening } from '@/server/stocks/screeners';
import { ScreenerService } from '@/server/stocks/screeners/service';
import { TradingViewScreener } from '@/server/stocks/screeners/tradingview/service';
import { Screeners } from '@/server/types';
import { Effect } from 'effect';
import { NextResponse } from 'next/server';

export const GET = withRequiredUser(
  withPosthog(async (request) => {
    const { searchParams } = new URL(request.url);
    const screener = searchParams.get('screener');
    if (!screener) {
      throw new Error('Screener is required');
    }

    const data = await Effect.runPromise(
      Effect.provideService(getScreening(screener as Screeners), ScreenerService, TradingViewScreener),
    );
    return NextResponse.json(data);
  }),
);

