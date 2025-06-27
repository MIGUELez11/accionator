import { withRequiredUser } from '@/lib/requireUser';
import { generateFinancialAnalysis } from '@/server/analysis/generateFinancialAnalysis';
import { generateNewsSummary } from '@/server/analysis/generateNewsSummary';
import { generateShouldBuyAction } from '@/server/analysis/generateShouldBuyAction';
import { withCache } from '@/server/cache/withCache';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { getBasicFinancials } from '@/server/stocks/getBasicFinancials';
import { getCompanyNews } from '@/server/stocks/getCompanyNews';
import { getStockPrice } from '@/server/stocks/getStockPrice';
import { getStockProfile } from '@/server/stocks/getStockProfile';
import { Effect } from 'effect';
import { NextResponse } from 'next/server';

function getAnalysis(symbol: string) {
  return Effect.gen(function* () {
    const news = yield* Effect.tryPromise({
      try: () => getCompanyNews(symbol),
      catch: (error) => {
        return new Error('Failed to get company news', { cause: error });
      },
    });
    const stockProfile = yield* Effect.tryPromise({
      try: () => getStockProfile(symbol),
      catch: (error) => {
        return new Error('Failed to get stock profile', { cause: error });
      },
    });

    const basicFinancials = yield* Effect.tryPromise({
      try: () => getBasicFinancials(symbol),
      catch: (error) => {
        return new Error('Failed to get basic financials', { cause: error });
      },
    });

    const stockPrice = yield* Effect.tryPromise({
      try: () => getStockPrice(symbol),
      catch: (error) => {
        return new Error('Failed to get stock price', { cause: error });
      },
    });

    const newsSummary = yield* generateNewsSummary(news, stockProfile);
    const financialAnalysis = yield* generateFinancialAnalysis(newsSummary.response, basicFinancials, stockPrice);
    const action = yield* generateShouldBuyAction(financialAnalysis.response, stockProfile);

    const response = {
      newsSummary,
      financialAnalysis,
      action,
      date: new Date(),
    };

    return response;
  });
}

export const GET = withRequiredUser(
  withPosthog(async (request) => {
    try {
      const { searchParams } = new URL(request.url);

      const symbol = searchParams.get('symbol');
      if (!symbol) {
        throw new Error('Symbol is required');
      }

      const response = await withCache(`ai-analysis:${symbol}`, 60 * 60 * 24, () =>
        Effect.runPromise(getAnalysis(symbol)),
      );

      return NextResponse.json(response);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }),
);
