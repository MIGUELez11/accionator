import { withCache } from "../cache/withCache";
import { getFinnhubClient } from "./clients/getFinnhubClient";
import type { CompanyNews as FinnhubCompanyNews } from "finnhub-ts";

export type CompanyNews = FinnhubCompanyNews[];

function parseDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export async function getCompanyNews(symbol: string): Promise<CompanyNews> {
  return withCache(`stock-company-news:${symbol}`, 10 * 60, async () => {
    const finnhubClient = await getFinnhubClient();

    const today = new Date();
    const oneYearAgo = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate(),
    );

    const response = await finnhubClient.companyNews(
      symbol,
      parseDate(oneYearAgo),
      parseDate(today),
    );
    return response.data;
  });
}
