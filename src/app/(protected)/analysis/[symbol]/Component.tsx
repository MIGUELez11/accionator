import { StockProfile } from '@/server/types';
import { Suspense } from 'react';
import { AIAnalysis } from './components/AIAnalysis';
import { BusinessInfo } from './components/BusinessInfo';
import { Recommendations } from './components/Recommendations';
import { BusinessInfoSkeleton } from './components/Skeletons/BusinessInfo';
import { RecommendationsSkeleton } from './components/Skeletons/Recommendations';
import { StockChartSkeleton } from './components/Skeletons/StockChart';
import StockChart from './components/StockChart';
import { StockHeader } from './components/StockHeader';

export function StockInfo({ symbol, stockProfile }: { symbol: string; stockProfile: StockProfile }) {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <StockHeader symbol={symbol} name={stockProfile.name!} logo={stockProfile.logo!} />
      <div className="grid grid-cols-2 gap-4 px-4">
        <div className="flex flex-col gap-4">
          <Suspense fallback={<BusinessInfoSkeleton />}>
            <BusinessInfo symbol={symbol} />
          </Suspense>
          <Suspense fallback={<StockChartSkeleton />}>
            <StockChart symbol={symbol} />
          </Suspense>
        </div>
        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations symbol={symbol} />
        </Suspense>
      </div>
      {/* <NewsCarousel symbol={symbol} /> */}
      <div className="grid grid-cols-1 gap-4 px-4">
        <AIAnalysis symbol={symbol} />
      </div>
    </div>
  );
}
