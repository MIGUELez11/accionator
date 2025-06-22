import { Effect } from 'effect';
import { CompanyNews } from '../stocks/getCompanyNews';
import { StockProfile } from '../stocks/getStockProfile';
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
