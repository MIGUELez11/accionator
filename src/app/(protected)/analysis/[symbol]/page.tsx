import { getQueryClient } from '@/app/getQueryClient';
import { stockInfoQuery } from '@/queries/stockInfoQuery';
import { stockNewsQuery } from '@/queries/stockNewsQuery';
import { saveSearchStock } from '@/server/convex/stocks/saveSearchStock';
import { getCompanyNews } from '@/server/stocks/getCompanyNews';
import { getStockFullInfo } from '@/server/stocks/getStockFullInfo';
import { getStockProfile } from '@/server/stocks/getStockProfile';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Effect } from 'effect';
import { notFound } from 'next/navigation';
import { StockInfo } from './Component';

export default async function AnalysisPage({ params }: { params: { symbol: string } }) {
  const { symbol } = await params;

  const queryClient = getQueryClient();

  const stockProfile = await getStockProfile(symbol);
  const ticker = stockProfile.ticker;

  if (!ticker) {
    return notFound();
  }

  queryClient.prefetchQuery(stockInfoQuery(ticker, () => getStockFullInfo(ticker)));
  queryClient.prefetchQuery(stockNewsQuery(ticker, () => getCompanyNews(ticker)));

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
