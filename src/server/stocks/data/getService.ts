import { Effect } from 'effect';
import { withCacheEffect } from '../../cache/withCache';
import { StocksService } from './service';

export const getCachedStocksService = Effect.gen(function* () {
  const stocksService = yield* StocksService;

  return StocksService.of({
    name: stocksService.name,

    getActionRecommendations: (symbol) =>
      withCacheEffect(
        `getActionRecommendations:${stocksService.name}:${symbol}`,
        60 * 60 * 24 * 7, // Cache for 7 days since recommendations don't change frequently
        stocksService.getActionRecommendations(symbol),
      ),
    getStockProfile: (symbol) =>
      withCacheEffect(
        `getStockProfile:${stocksService.name}:${symbol}`,
        60 * 60 * 24 * 7, // Cache for 7 days since company profiles are relatively static
        stocksService.getStockProfile(symbol),
      ),
    getStockPrice: (symbol) =>
      withCacheEffect(
        `getStockPrice:${stocksService.name}:${symbol}`,
        60 * 5, // Cache for 5 minutes since prices change frequently
        stocksService.getStockPrice(symbol),
      ),
    getBasicFinancials: (symbol) =>
      withCacheEffect(
        `getBasicFinancials:${stocksService.name}:${symbol}`,
        60 * 60 * 24, // Cache for 1 day since financials update daily
        stocksService.getBasicFinancials(symbol),
      ),
    getCompanyNews: (symbol) =>
      withCacheEffect(
        `getCompanyNews:${stocksService.name}:${symbol}`,
        60 * 30, // Cache for 30 minutes since news updates frequently
        stocksService.getCompanyNews(symbol),
      ),
  });
});
