import { generateFinancialAnalysis } from "@/server/analysis/generateFinancialAnalysis";
import { generateNewsSummary } from "@/server/analysis/generateNewsSummary";
import { generateShouldBuyAction } from "@/server/analysis/generateShouldBuyAction";
import { withCache } from "@/server/cache/withCache";
import { getBasicFinancials } from "@/server/stocks/getBasicFinancials";
import { getCompanyNews } from "@/server/stocks/getCompanyNews";
import { getStockPrice } from "@/server/stocks/getStockPrice";
import { getStockProfile } from "@/server/stocks/getStockProfile";
import { Effect } from 'effect';
import { NextRequest, NextResponse } from "next/server";

async function getAnalysis(symbol: string) {
  const news = await getCompanyNews(symbol);
  const stockProfile = await getStockProfile(symbol);
  const basicFinancials = await getBasicFinancials(symbol);
  const stockPrice = await getStockPrice(symbol);

  const newsSummary = await Effect.runPromise(generateNewsSummary(news, stockProfile));
  const financialAnalysis = await Effect.runPromise(
    generateFinancialAnalysis(newsSummary.response, basicFinancials, stockPrice),
  );
  const action = await Effect.runPromise(generateShouldBuyAction(financialAnalysis.response, stockProfile));

  const response = {
    newsSummary,
    financialAnalysis,
    action,
    date: new Date(),
  };

  return response;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const symbol = searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  const response = await withCache(
    `ai-analysis:${symbol}`,
    60 * 60 * 24,
    async () => {
      return await getAnalysis(symbol);
    },
  );

  return NextResponse.json(response);
}
