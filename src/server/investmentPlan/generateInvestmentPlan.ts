import { Effect } from 'effect';
import { getAnalysis } from '../analysis/utils/getAnalysis';
import { getPrompt } from '../analysis/utils/getPrompt';
import { InvestmentPlanResponse } from '../types';
import { analyzeRecommendedStocks } from './analyzeRecommendedStocks';

export const generateInvestmentPlan = Effect.fn(function* (investmentCapital: number) {
  const start = performance.now();

  const analysis = yield* analyzeRecommendedStocks;
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
