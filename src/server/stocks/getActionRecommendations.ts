import { RecommendationTrend } from "finnhub-ts";
import { getFinnhubClient } from "./clients/getFinnhubClient";

export type ActionRecommendations = RecommendationTrend[];

export async function getActionRecommendations(
  symbol: string
): Promise<ActionRecommendations> {
  const finnhubClient = await getFinnhubClient();

  const response = await finnhubClient.recommendationTrends(symbol);

  return response.data;
}
