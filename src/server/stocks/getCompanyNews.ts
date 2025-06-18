import { getFinnhubClient } from "./getFinnhubClient";
import type { CompanyNews as FinnhubCompanyNews } from "finnhub-ts";

export type CompanyNews = FinnhubCompanyNews[];

function parseDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export async function getCompanyNews(symbol: string): Promise<CompanyNews> {
  const finnhubClient = await getFinnhubClient();

  const today = new Date();
  const oneYearAgo = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );

  const response = await finnhubClient.companyNews(
    symbol,
    parseDate(oneYearAgo),
    parseDate(today)
  );
  return response.data;
}
