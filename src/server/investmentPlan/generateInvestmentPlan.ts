import { Effect } from 'effect';
import { AIService } from '../ai/AIService';
import { getAIService } from '../ai/getAIService';
import { getAnalysis } from '../analysis/utils/getAnalysis';
import { getPrompt } from '../analysis/utils/getPrompt';
import { InvestmentPlanResponse } from '../types';
import { analyzeRecommendedStocks } from './analyzeRecommendedStocks';

export const generateInvestmentPlan = Effect.fn(function* () {
  const start = performance.now();

  const analysis = yield* analyzeRecommendedStocks();
  const suggestedStocks = Object.entries(analysis).map(([stock, analysis]) => ({
    symbol: stock,
    ...analysis.action.response,
  }));

  const prompt = yield* getPrompt('INVESTMENT_PLAN', {
    StocksAnalysis: JSON.stringify(suggestedStocks),
  });

  yield* Effect.log('Getting investment plan');

  const aiService = yield* getAIService('gemini-2.0-flash');
  yield* aiService.chat.initialize();

  const response = (yield* getAnalysis(prompt, true).pipe(
    Effect.withLogSpan('getInvestmentPlan'),
    Effect.provideService(AIService, aiService),
  )) as unknown as InvestmentPlanResponse;
  response.response.createdAt = new Date();
  yield* Effect.log(`Investment plan done in ${performance.now() - start}ms`);

  return response;
});
