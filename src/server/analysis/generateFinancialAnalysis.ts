import { Effect } from 'effect';
import { BasicFinancials, StockPrice } from '../types';
import { getAnalysis } from './utils/getAnalysis';
import { getPrompt } from './utils/getPrompt';

export const generateFinancialAnalysis = Effect.fn(function* (
  newsSummary: string,
  basicFinancials: BasicFinancials,
  stockPrice: StockPrice,
) {
  const prompt = yield* getPrompt('FINANCIAL_ANALYSIS', {
    News: newsSummary,
    BasicFinancials: JSON.stringify(basicFinancials),
    Quote: JSON.stringify(stockPrice),
  });

  return yield* getAnalysis(prompt);
});
