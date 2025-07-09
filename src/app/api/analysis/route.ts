import { withRequiredUser } from '@/lib/requireUser';
import { generateFinancialAnalysis } from '@/server/analysis/generateFinancialAnalysis';
import { generateNewsSummary } from '@/server/analysis/generateNewsSummary';
import { generateShouldBuyAction } from '@/server/analysis/generateShouldBuyAction';
import { FinnhubCachedStocksService } from '@/server/newStocks/finnhub/service';
import { StocksService } from '@/server/newStocks/service';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { Effect } from 'effect';
import { NextResponse } from 'next/server';

const getAnalysis = Effect.fn(function* (symbol: string) {
  const stocksService = yield* StocksService;

  const [news, stockProfile, basicFinancials, stockPrice] = yield* Effect.all([
    stocksService.getCompanyNews(symbol),
    stocksService.getStockProfile(symbol),
    stocksService.getBasicFinancials(symbol),
    stocksService.getStockPrice(symbol),
  ]);

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

export const GET = withRequiredUser(
  withPosthog(async (request) => {
    try {
      const { searchParams } = new URL(request.url);

      const symbol = searchParams.get('symbol');
      if (!symbol) {
        throw new Error('Symbol is required');
      }

      const stockService = await Effect.runPromise(FinnhubCachedStocksService);
      const response = await Effect.runPromise(Effect.provideService(getAnalysis(symbol), StocksService, stockService));

      return NextResponse.json(response);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }),
);
