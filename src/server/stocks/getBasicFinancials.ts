import type { BasicFinancials as FinnhubBasicFinancials } from 'finnhub-ts';
import { withCache } from '../cache/withCache';
import { getFinnhubClient } from './clients/getFinnhubClient';

export type BasicFinancials = FinnhubBasicFinancials;

export async function getBasicFinancials(symbol: string): Promise<BasicFinancials> {
  return withCache(`stock-basic-financials:${symbol}`, 10 * 60, async () => {
    const finnhubClient = getFinnhubClient();

    const response = await finnhubClient.companyBasicFinancials(symbol, 'all');

    return response.data;
  });
}
