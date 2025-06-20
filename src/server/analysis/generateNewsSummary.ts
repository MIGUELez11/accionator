import { CompanyNews } from "../stocks/getCompanyNews";
import { StockProfile } from "../stocks/getStockProfile";
import { getAnalysis } from "./utils/getAnalysis";
import { getPrompt } from "./utils/getPrompt";

export async function generateNewsSummary(
  news: CompanyNews,
  stockInfo: StockProfile
) {
  const prompt = await getPrompt("NEWS_SUMMARY", {
    News: JSON.stringify(news),
    StockInfo: JSON.stringify(stockInfo),
  });

  return getAnalysis(prompt);
}
