import { Effect } from 'effect';
import { CompanyNews, StockProfile } from '../types';
import { AnalysisResponse, getAnalysis } from './utils/getAnalysis';
import { getPrompt } from './utils/getPrompt';

export function generateNewsSummary(
  news: CompanyNews,
  stockInfo: StockProfile,
): Effect.Effect<AnalysisResponse, Error> {
  return Effect.gen(function* () {
    const prompt = yield* getPrompt('NEWS_SUMMARY', {
      News: JSON.stringify(news),
      StockInfo: JSON.stringify(stockInfo),
    });

    return yield* getAnalysis(prompt);
  });
}
