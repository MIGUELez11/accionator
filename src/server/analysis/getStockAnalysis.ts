import { Effect } from 'effect';
import { AIService } from '../ai/AIService';
import { StocksService } from '../stocks/data/service';
import { generateFinancialAnalysis } from './generateFinancialAnalysis';
import { generateNewsSummary } from './generateNewsSummary';
import { generateShouldBuyAction } from './generateShouldBuyAction';

export const getStockAnalysis = Effect.fn(function* (symbol: string) {
  const stocksService = yield* StocksService;

  const [news, stockProfile, basicFinancials, stockPrice] = yield* Effect.all([
    stocksService.getCompanyNews(symbol),
    stocksService.getStockProfile(symbol),
    stocksService.getBasicFinancials(symbol),
    stocksService.getStockPrice(symbol),
  ]);

  const aiService = yield* AIService;
  yield* aiService.chat.initialize();

  const newsSummary = yield* generateNewsSummary(news, stockProfile);
  const financialAnalysis = yield* generateFinancialAnalysis(newsSummary.response, basicFinancials, stockPrice);
  const action = yield* generateShouldBuyAction(financialAnalysis.response, stockProfile);

  const response = {
    newsSummary,
    financialAnalysis,
    action,
    date: new Date(),
  };

  return response;
});
