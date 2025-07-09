import { Effect } from 'effect';
import { FinnhubCachedStocksService } from '../newStocks/finnhub/service';
import { StockInfo } from '../types';

export async function getStockFullInfo(symbol: string | null): Promise<StockInfo> {
  if (!symbol) {
    throw new Error('Symbol is required');
  }

  const stockService = await Effect.runPromise(FinnhubCachedStocksService);
  const stockProfile = await Effect.runPromise(stockService.getStockProfile(symbol));

  if (!stockProfile.ticker) {
    throw new Error('Stock not found');
  }

  const ticker = stockProfile.ticker;

  const [price, recommendations, news] = await Effect.runPromise(
    Effect.all([
      stockService.getStockPrice(ticker),
      stockService.getActionRecommendations(ticker),
      stockService.getCompanyNews(ticker),
    ]),
  );

  const response: StockInfo = { stockProfile, price, recommendations, news };

  return response;
}
