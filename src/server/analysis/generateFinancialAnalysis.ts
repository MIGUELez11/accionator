import { BasicFinancials } from "../stocks/getBasicFinancials";
import { StockPrice } from "../stocks/getStockPrice";
import { getAnalysis } from "./utils/getAnalysis";
import { getPrompt } from "./utils/getPrompt";

export async function generateFinancialAnalysis(
  newsSummary: string,
  basicFinancials: BasicFinancials,
  stockPrice: StockPrice
) {
  const prompt = await getPrompt("FINANCIAL_ANALYSIS", {
    News: newsSummary,
    BasicFinancials: JSON.stringify(basicFinancials),
    Quote: JSON.stringify(stockPrice),
  });

  return getAnalysis(prompt);
}