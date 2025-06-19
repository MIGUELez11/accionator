import { getFinnhubClient } from "./clients/getFinnhubClient";

export interface StockPrice {
  price?: number;
  change?: number;
  percentChange?: number;
  openPrice?: number;
  high?: number;
  low?: number;
  previousClose?: number;
}

export async function getStockPrice(symbol: string): Promise<StockPrice> {
  const finnhubClient = await getFinnhubClient();

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
}
