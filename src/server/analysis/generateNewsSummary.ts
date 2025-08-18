import { Effect } from 'effect';
import { CompanyNews, StockProfile } from '../types';
import { getAnalysis } from './utils/getAnalysis';
import { getPrompt } from './utils/getPrompt';

export const generateNewsSummary = Effect.fn(function* (news: CompanyNews, stockInfo: StockProfile) {
  const prompt = yield* getPrompt('NEWS_SUMMARY', {
    News: JSON.stringify(news),
    StockInfo: JSON.stringify(stockInfo),
  });

  return yield* getAnalysis(prompt);
});
