import { StockProfile } from "../stocks/getStockProfile";
import { getAnalysis } from "./utils/getAnalysis";
import { getPrompt } from "./utils/getPrompt";

export async function generateShouldBuyAction(analysis: string, stockInfo: StockProfile) {
  const prompt = await getPrompt("SHOULD_BUY_ACTION", {
    Analysis: analysis,
    StockInfo: JSON.stringify(stockInfo),
  });

  return getAnalysis(prompt);
}