import { withCache } from '../cache/withCache';
import { StockProfile } from '../types';
import { getFinnhubClient } from './clients/getFinnhubClient';

export async function getStockProfile(symbol: string): Promise<StockProfile> {
  return withCache(`stock-profile:${symbol}`, 10 * 60, async () => {
    const finnhubClient = getFinnhubClient();

    const response = await finnhubClient.companyProfile2(symbol);

    return {
      ...response.data,
      marketCapitalization: (response.data.marketCapitalization ?? 0) * 1e3,
    };
  });
}
