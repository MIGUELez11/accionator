import { StockInfo } from '../types';
import { getActionRecommendations } from './getActionRecommendations';
import { getCompanyNews } from './getCompanyNews';
import { getStockPrice } from './getStockPrice';
import { getStockProfile } from './getStockProfile';

export async function getStockFullInfo(symbol: string | null): Promise<StockInfo> {
  if (!symbol) {
    throw new Error('Symbol is required');
  }

  const stockProfile = await getStockProfile(symbol);

  if (!stockProfile.ticker) {
    throw new Error('Stock not found');
  }

  const ticker = stockProfile.ticker;

  const [price, recommendations, news] = await Promise.all([
    getStockPrice(ticker),
    getActionRecommendations(ticker),
    getCompanyNews(ticker),
  ]);

  const response: StockInfo = { stockProfile, price, recommendations, news };

  return response;
}
