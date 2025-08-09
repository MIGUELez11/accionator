import { getFinnhubClient } from '@/server/stocks/clients/getFinnhubClient';
import { Effect } from 'effect';
import { getCachedStocksService } from '../getService';
import { StocksService } from '../service';

function parseDate(date: Date) {
  return date.toISOString().split('T')[0];
}

const finnhubClient = getFinnhubClient();

export const FinnhubStocksService = StocksService.of({
  name: 'finnhub',

  getActionRecommendations: Effect.fn(function* (symbol: string) {
    const response =
      yield *
      Effect.tryPromise({
        try: () => finnhubClient.recommendationTrends(symbol),
        catch: (error) => new Error(`Failed to get action recommendations for ${symbol}`, { cause: error }),
      });

    return response.data;
  }),
  getBasicFinancials: Effect.fn(function* (symbol: string) {
    const response =
      yield *
      Effect.tryPromise({
        try: () => finnhubClient.companyBasicFinancials(symbol, 'all'),
        catch: (error) => new Error(`Failed to get basic financials for ${symbol}`, { cause: error }),
      });

    return response.data;
  }),
  getCompanyNews: Effect.fn(function* (symbol: string) {
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    const response =
      yield *
      Effect.tryPromise({
        try: () => finnhubClient.companyNews(symbol, parseDate(oneYearAgo), parseDate(today)),
        catch: (error) => new Error(`Failed to get company news for ${symbol}`, { cause: error }),
      });

    return response.data;
  }),
  getStockPrice: Effect.fn(function* (symbol: string) {
    const quote =
      yield *
      Effect.tryPromise({
        try: () => finnhubClient.quote(symbol),
        catch: (error) => new Error(`Failed to get stock price for ${symbol}`, { cause: error }),
      });

    return {
      price: quote.data.c,
      change: quote.data.d,
      percentChange: quote.data.dp,
      openPrice: quote.data.o,
      high: quote.data.h,
      low: quote.data.l,
      previousClose: quote.data.pc,
    };
  }),
  getStockProfile: Effect.fn(function* (symbol: string) {
    const response =
      yield *
      Effect.tryPromise({
        try: async () => {
          const profile = await finnhubClient.companyProfile2(symbol);

          if (!profile.data.ticker) {
            throw new Error(`No profile found for ${symbol}`);
          }

          return profile;
        },
        catch: (error) => new Error(`Failed to get stock profile for ${symbol}`, { cause: error }),
      });

    return {
      ...response.data,
      marketCapitalization: (response.data.marketCapitalization ?? 0) * 1e3,
    };
  }),
});

export const FinnhubCachedStocksService = Effect.provideService(
  getCachedStocksService,
  StocksService,
  FinnhubStocksService,
);