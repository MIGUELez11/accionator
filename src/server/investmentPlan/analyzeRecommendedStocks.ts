import { Effect } from 'effect';
import { getStockAnalysis } from '../analysis/getStockAnalysis';
import { removeCacheMany } from '../cache/removeCache';
import { withCacheEffect } from '../cache/withCache';
import { pickStocksToSearch } from './pickScreenedStocks';

export const analyzeRecommendedStocks = Effect.gen(function* () {
  const { response: suggestedStocks } = yield* pickStocksToSearch.pipe(Effect.withLogSpan('pickStocksToSearch'));

  const cacheKeysToRemove = suggestedStocks.map((stock) => `ai-analysis:${stock}`);
  yield* removeCacheMany(cacheKeysToRemove);

  const analysisEffects = suggestedStocks.reduce(
    (acc, symbol) => {
      acc[symbol] = withCacheEffect(`ai-analysis:${symbol}`, 60 * 60 * 24 * 7, getStockAnalysis(symbol)).pipe(
        Effect.withLogSpan(`getStockAnalysis:${symbol}`),
        Effect.tap(() => Effect.log(`Getting analysis for ${symbol} done`)),
      );
      return acc;
    },
    {} as Record<string, ReturnType<typeof getStockAnalysis>>,
  );

  const stockAnalysis = yield* Effect.all(analysisEffects, {
    concurrency: 5,
  });

  return stockAnalysis;
});
