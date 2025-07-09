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
        60 * 60 * 24,
        stocksService.getActionRecommendations(symbol),
      ),
    getStockProfile: (symbol) =>
      withCacheEffect(
        `getStockProfile:${stocksService.name}:${symbol}`,
        60 * 60 * 24,
        stocksService.getStockProfile(symbol),
      ),
    getStockPrice: (symbol) =>
      withCacheEffect(
        `getStockPrice:${stocksService.name}:${symbol}`,
        60 * 60 * 24,
        stocksService.getStockPrice(symbol),
      ),
    getBasicFinancials: (symbol) =>
      withCacheEffect(
        `getBasicFinancials:${stocksService.name}:${symbol}`,
        60 * 60 * 24,
        stocksService.getBasicFinancials(symbol),
      ),
    getCompanyNews: (symbol) =>
      withCacheEffect(
        `getCompanyNews:${stocksService.name}:${symbol}`,
        60 * 60 * 24,
        stocksService.getCompanyNews(symbol),
      ),
  });
});
