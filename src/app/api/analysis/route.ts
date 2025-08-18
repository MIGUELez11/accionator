import { withRequiredUser } from '@/lib/requireUser';
import { AIService } from '@/server/ai/AIService';
import { getAIService } from '@/server/ai/getAIService';
import { getStockAnalysis } from '@/server/analysis/getStockAnalysis';
import { withCacheEffect } from '@/server/cache/withCache';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { FinnhubCachedStocksService } from '@/server/stocks/data/finnhub/service';
import { StocksService } from '@/server/stocks/data/service';
import { Context, Effect, Logger, LogLevel } from 'effect';
import { NextResponse } from 'next/server';

const generateStockAnalysis = Effect.fn(function* (symbol: string) {
  const stocksService = yield* FinnhubCachedStocksService;
  const aiService = yield* getAIService('gemini-2.0-flash');

  const context = Context.empty().pipe(Context.add(StocksService, stocksService), Context.add(AIService, aiService));

  const getFinnhubAnalysis = getStockAnalysis(symbol).pipe(Effect.provide(context));
  const getCachedAnalysis = withCacheEffect(`ai-analysis:${symbol}`, 60 * 60 * 24 * 7, getFinnhubAnalysis);

  const response = yield* getCachedAnalysis;

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

      const stockService = await Effect.runPromise(
        generateStockAnalysis(symbol).pipe(Logger.withMinimumLogLevel(LogLevel.Debug)),
      );

      return NextResponse.json(stockService);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }),
);
