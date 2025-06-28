import { Effect } from 'effect';
import { BasicFinancials, StockPrice } from '../types';
import { AnalysisResponse, getAnalysis } from './utils/getAnalysis';
import { getPrompt } from './utils/getPrompt';

export function generateFinancialAnalysis(
  newsSummary: string,
  basicFinancials: BasicFinancials,
  stockPrice: StockPrice,
): Effect.Effect<AnalysisResponse, Error> {
  return Effect.gen(function* () {
    const prompt = yield* getPrompt('FINANCIAL_ANALYSIS', {
      News: newsSummary,
      BasicFinancials: JSON.stringify(basicFinancials),
      Quote: JSON.stringify(stockPrice),
    });

    return yield* getAnalysis(prompt);
  });
}
