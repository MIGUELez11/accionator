'use client';

import { stockInfoQuery } from '@/queries/stockInfoQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AIAnalysis } from './components/AIAnalysis';
import { BusinessInfo } from './components/BusinessInfo';
import { NewsCarousel } from './components/NewsCarousel/NewsCarousel';
import { Recommendations } from './components/Recommendations';
import StockChart from './components/StockChart';
import { StockHeader } from './components/StockHeader';

export function StockInfo({ symbol }: { symbol: string }) {
  const { data, error } = useSuspenseQuery(stockInfoQuery(symbol));

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { stockProfile, price, recommendations, news } = data;
  return (
    <div className="flex flex-col gap-4 pb-10">
      <StockHeader
        symbol={stockProfile.ticker!}
        name={stockProfile.name!}
        logo={stockProfile.logo!}
        price={price.price!}
        percentChange={price.percentChange!}
      />
      <div className="grid grid-cols-2 gap-4 px-4">
        <div className="flex flex-col gap-4">
          <BusinessInfo
            exchange={stockProfile.exchange!}
            sector={stockProfile.finnhubIndustry!}
            capitalization={stockProfile.marketCapitalization!}
            currency={stockProfile.currency!}
            website={stockProfile.weburl!}
            country={stockProfile.country!}
          />
          <StockChart symbol={stockProfile.ticker!} />
        </div>
        <Recommendations recommendations={recommendations} />
      </div>
      <NewsCarousel news={news} />
      <div className="grid grid-cols-1 gap-4 px-4">
        <AIAnalysis symbol={stockProfile.ticker!} />
      </div>
    </div>
  );
}
