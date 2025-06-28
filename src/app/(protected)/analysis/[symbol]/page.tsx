import { getQueryClient } from '@/app/getQueryClient';
import { stockInfoQuery } from '@/queries/stockInfoQuery';
import { saveSearchStock } from '@/server/convex/stocks/saveSearchStock';
import { getStockFullInfo } from '@/server/stocks/getStockFullInfo';
import { getStockProfile } from '@/server/stocks/getStockProfile';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Effect } from 'effect';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { StockInfo } from './Component';
import { BusinessInfoSkeleton } from './components/Skeletons/BusinessInfo';
import { RecommendationsSkeleton } from './components/Skeletons/Recommendations';
import { StockChartSkeleton } from './components/Skeletons/StockChart';
import { StockHeaderSkeleton } from './components/Skeletons/StockHeader';

function StockInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <StockHeaderSkeleton />

      <div className="grid grid-cols-2 gap-4 px-4">
        <div className="flex flex-col gap-4">
          <BusinessInfoSkeleton />
          <StockChartSkeleton />
        </div>
        <div className="flex flex-col gap-4">
          <RecommendationsSkeleton />
        </div>
      </div>
    </div>
  );
}

export default async function AnalysisPage({ params }: { params: { symbol: string } }) {
  const { symbol } = await params;

  const queryClient = getQueryClient();

  const stockProfile = await getStockProfile(symbol);
  const ticker = stockProfile.ticker;

  if (!ticker) {
    return notFound();
  }

  queryClient.prefetchQuery(stockInfoQuery(ticker, async () => getStockFullInfo(ticker)));

  Effect.runPromise(
    saveSearchStock({
      stock: ticker,
      sector: stockProfile.finnhubIndustry ?? 'Unknown',
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<StockInfoSkeleton />}>
        <StockInfo symbol={ticker} />
      </Suspense>
    </HydrationBoundary>
  );
}
