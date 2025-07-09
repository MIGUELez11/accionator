import { getQueryClient } from '@/app/getQueryClient';
import { stockInfoQuery } from '@/queries/stockInfoQuery';
import { stockNewsQuery } from '@/queries/stockNewsQuery';
import { saveSearchStock } from '@/server/convex/stocks/saveSearchStock';
import { FinnhubCachedStocksService } from '@/server/newStocks/finnhub/service';
import { getStockFullInfo } from '@/server/stocks/getStockFullInfo';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Effect } from 'effect';
import { notFound } from 'next/navigation';
import { StockInfo } from './Component';

export default async function AnalysisPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;

  const queryClient = getQueryClient();

  const stockService = await Effect.runPromise(FinnhubCachedStocksService);
  const stockProfile = await Effect.runPromise(stockService.getStockProfile(symbol));
  const ticker = stockProfile.ticker;

  if (!ticker) {
    return notFound();
  }

  queryClient.prefetchQuery(stockInfoQuery(ticker, () => getStockFullInfo(ticker)));
  queryClient.prefetchQuery(stockNewsQuery(ticker, () => Effect.runPromise(stockService.getCompanyNews(ticker))));

  Effect.runPromise(
    saveSearchStock({
      stock: ticker,
      sector: stockProfile.finnhubIndustry ?? 'Unknown',
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StockInfo symbol={ticker} stockProfile={stockProfile} />
    </HydrationBoundary>
  );
}
