import { withCache } from "../cache/withCache";
import { StockPrice } from '../types';
import { getFinnhubClient } from "./clients/getFinnhubClient";

export async function getStockPrice(symbol: string): Promise<StockPrice> {
  return withCache(`stock-price:${symbol}`, 10 * 60, async () => {
    const finnhubClient = getFinnhubClient();

    const quote = await finnhubClient.quote(symbol);

    return {
      price: quote.data.c,
      change: quote.data.d,
      percentChange: quote.data.dp,
      openPrice: quote.data.o,
      high: quote.data.h,
      low: quote.data.l,
      previousClose: quote.data.pc,
    };
  });
}
