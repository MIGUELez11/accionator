import { Effect } from 'effect';
import { getStockAnalysis } from '../analysis/getStockAnalysis';
import { removeCacheMany } from '../cache/removeCache';
import { withCacheEffect } from '../cache/withCache';
import { pickStocksToSearch } from './pickScreenedStocks';

export const analyzeRecommendedStocks = Effect.gen(function* () {
  const { response: suggestedStocks } = yield* pickStocksToSearch.pipe(Effect.withLogSpan('pickStocksToSearch'));

  const cacheKeysToRemove = suggestedStocks.map((stock) => `ai-analysis:${stock}`);
  yield* removeCacheMany(cacheKeysToRemove);

  const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7; // 1 week

  const analysisEffects = Object.fromEntries(
    suggestedStocks.map((symbol) => [
      symbol,
      withCacheEffect(`ai-analysis:${symbol}`, CACHE_TTL_SECONDS, getStockAnalysis(symbol)).pipe(
        Effect.withLogSpan(`getStockAnalysis:${symbol}`),
        Effect.tap(() => Effect.log(`Getting analysis for ${symbol} done`)),
      ),
    ]),
  );

  const stockAnalysis = yield* Effect.all(analysisEffects, {
    concurrency: 5,
  });

  return stockAnalysis;
});
