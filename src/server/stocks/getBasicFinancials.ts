import { withCache } from "../cache/withCache";
import { getFinnhubClient } from "./clients/getFinnhubClient";
import type { BasicFinancials as FinnhubBasicFinancials } from "finnhub-ts";

export type BasicFinancials = FinnhubBasicFinancials;

export async function getBasicFinancials(
  symbol: string,
): Promise<BasicFinancials> {
  return withCache(`stock-basic-financials:${symbol}`, 10 * 60, async () => {
    const finnhubClient = await getFinnhubClient();

    const response = await finnhubClient.companyBasicFinancials(symbol, "all");

    return response.data;
  });
}
