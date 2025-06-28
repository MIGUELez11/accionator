import { withCache } from "../cache/withCache";
import { Screeners, screeners } from '../types';
import { getFinancialmodelingprepClient } from './clients/getFinancialmodelingprepClient';

export function getScreening(screener: Screeners) {
  return withCache(`screener:${screener}`, 60 * 60, async () => {
    const client = await getFinancialmodelingprepClient();

    const result = await client.stockScreener(screeners[screener]);

    return result;
  });
}
