import { Effect } from 'effect';
import { removeCacheMany } from '../cache/removeCache';
import { withCacheEffect } from '../cache/withCache';
import { getScreening } from '../stocks/screeners';
import { InvestmentPlanResponse } from '../types';
import { getStockAnalysis } from './getStockAnalysis';
import { AnalysisResponse, getAnalysis } from './utils/getAnalysis';
import { getPrompt } from './utils/getPrompt';

export const pickStocksToSearch = Effect.gen(function* () {
  yield* Effect.log('Screening stocks');
  const [highVolatilityWithGrow, nasdaq100, pennyHighBeta, pennyStocksHighVolume] = yield* Effect.all([
    getScreening('highVolatilityWithGrow'),
    getScreening('nasdaq100'),
    getScreening('pennyHighBeta'),
    getScreening('pennyStocksHighVolume'),
  ]);

  yield* Effect.log('Screening stocks done');

  const screendStocks = {
    highVolatilityWithGrow,
    nasdaq100,
    pennyHighBeta,
    pennyStocksHighVolume,
  };

  yield* Effect.log('Getting prompt');
  const prompt = yield* getPrompt('PICK_STOCKS_TO_SEARCH', {
    ScreenedStocks: JSON.stringify(screendStocks),
  });

  yield* Effect.log('Getting analysis');
  const response = yield* getAnalysis(prompt, true);
  yield* Effect.log('Analysis done');

  return response as Omit<AnalysisResponse<true>, 'response'> & { response: string[] };
});

export const getRecommendedStockAnalysis = Effect.gen(function* () {
  const { response: suggestedStocks } = yield* pickStocksToSearch.pipe(Effect.withLogSpan('pickStocksToSearch'));

  const cacheKeysToRemove = suggestedStocks.map((stock) => `ai-analysis:${stock}`);
  yield * removeCacheMany(cacheKeysToRemove);

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

  const stockAnalysis =
    yield *
    Effect.all(analysisEffects, {
      concurrency: 5,
    });

  return stockAnalysis;
});

export const getInvestmentPlan = Effect.fn(function* (investmentCapital: number) {
  const start = performance.now();

  const analysis = yield* getRecommendedStockAnalysis;
  const suggestedStocks = Object.entries(analysis).map(([stock, analysis]) => ({
    symbol: stock,
    ...analysis.action.response,
  }));

  const prompt = yield* getPrompt('INVESTMENT_PLAN', {
    StocksAnalysis: JSON.stringify(suggestedStocks),
    InvestmentCapital: `You have $${investmentCapital} to invest`,
  });

  yield* Effect.log('Getting investment plan');
  const response = (yield* getAnalysis(prompt, true).pipe(
    Effect.withLogSpan('getInvestmentPlan'),
  )) as unknown as InvestmentPlanResponse;
  response.response.createdAt = new Date();
  yield* Effect.log(`Investment plan done in ${performance.now() - start}ms`);

  return response;
});
