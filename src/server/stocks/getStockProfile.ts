import { CompanyProfile2 } from "finnhub-ts";
import { getFinnhubClient } from "./getFinnhubClient";

export type StockProfile = CompanyProfile2

export async function getStockProfile(symbol: string): Promise<StockProfile> {
  const finnhubClient = getFinnhubClient();

  const response = await finnhubClient.companyProfile2(symbol);

  return response.data;
}