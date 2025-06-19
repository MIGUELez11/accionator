import { CompanyProfile2 } from "finnhub-ts";
import { getFinnhubClient } from "./clients/getFinnhubClient";
import { withCache } from "../cache/withCache";

export type StockProfile = CompanyProfile2

export async function getStockProfile(symbol: string): Promise<StockProfile> {
  return withCache(`stock-profile:${symbol}`, 10 * 60, async () => {
    const finnhubClient = getFinnhubClient();

    const response = await finnhubClient.companyProfile2(symbol);

    return { ...response.data, marketCapitalization: (response.data.marketCapitalization ?? 0) * 1e3 };
  });
}