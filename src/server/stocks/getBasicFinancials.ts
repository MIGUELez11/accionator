import { getFinnhubClient } from "./getFinnhubClient";
import type { BasicFinancials as FinnhubBasicFinancials } from "finnhub-ts";

export type BasicFinancials = FinnhubBasicFinancials;

export async function getBasicFinancials(
  symbol: string
): Promise<BasicFinancials> {
  const finnhubClient = await getFinnhubClient();

  const response = await finnhubClient.companyBasicFinancials(symbol, "all");

  return response.data;
}
