import { RecommendationTrend } from "finnhub-ts";
import { getFinnhubClient } from "./clients/getFinnhubClient";
import { withCache } from "../cache/withCache";

export type ActionRecommendations = RecommendationTrend[];

export async function getActionRecommendations(
  symbol: string,
): Promise<ActionRecommendations> {
  return withCache(`stock-recommendations:${symbol}`, 10 * 60, async () => {
    const finnhubClient = await getFinnhubClient();

    const response = await finnhubClient.recommendationTrends(symbol);

    return response.data;
  });
}
