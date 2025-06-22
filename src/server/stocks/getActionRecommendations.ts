import { RecommendationTrend } from "finnhub-ts";
import { withCache } from '../cache/withCache';
import { getFinnhubClient } from './clients/getFinnhubClient';

export type ActionRecommendations = RecommendationTrend[];

export async function getActionRecommendations(
  symbol: string,
): Promise<ActionRecommendations> {
  return withCache(`stock-recommendations:${symbol}`, 10 * 60, async () => {
    const finnhubClient = getFinnhubClient();

    const response = await finnhubClient.recommendationTrends(symbol);

    return response.data;
  });
}
