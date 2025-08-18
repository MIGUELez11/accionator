import { Effect } from 'effect';
import { AIService } from '../ai/AIService';
import { getAIService } from '../ai/getAIService';
import { getStockAnalysis } from '../analysis/getStockAnalysis';
import { removeCacheMany } from '../cache/removeCache';
import { withCacheEffect } from '../cache/withCache';
import { pickStocksToSearch } from './pickScreenedStocks';

const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7; // 1 week

const analyzeSuggestedStock = Effect.fn(function* (symbol: string) {
  const aiService = yield* getAIService('gemini-2.0-flash');

  yield* aiService.chat.initialize();

  const analysis = withCacheEffect(`ai-analysis:${symbol}`, CACHE_TTL_SECONDS, getStockAnalysis(symbol)).pipe(
    Effect.withLogSpan(`getStockAnalysis:${symbol}`),
    Effect.tap(() => Effect.log(`Getting analysis for ${symbol} done`)),
    Effect.provideService(AIService, aiService),
  );

  return yield* analysis;
});

export const analyzeRecommendedStocks = Effect.fn(function* () {
  const { response: suggestedStocks } = yield* pickStocksToSearch.pipe(Effect.withLogSpan('pickStocksToSearch'));

  const cacheKeysToRemove = suggestedStocks.map((stock) => `ai-analysis:${stock}`);
  yield* removeCacheMany(cacheKeysToRemove);

  const analysisEffects = Object.fromEntries(suggestedStocks.map((symbol) => [symbol, analyzeSuggestedStock(symbol)]));

  const stockAnalysis = yield* Effect.all(analysisEffects, {
    concurrency: 1,
  });

  return stockAnalysis;
});
