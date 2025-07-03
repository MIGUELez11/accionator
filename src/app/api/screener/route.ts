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

    // Validate screener value against allowed types
    const validScreeners = ['highVolatilityWithGrow', 'pennyStocksHighVolume', 'pennyHighBeta', 'nasdaq100'] as const;
    if (!validScreeners.includes(screener as (typeof validScreeners)[number])) {
      return NextResponse.json(
        { error: `Invalid screener type. Must be one of: ${validScreeners.join(', ')}` },
        { status: 400 },
      );
    }

    const data = await Effect.runPromise(
      Effect.provideService(getScreening(screener as Screeners), ScreenerService, TradingViewScreener),
    );
    return NextResponse.json(data);
  }),
);

