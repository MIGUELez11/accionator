import { getActionRecommendations } from '@/server/stocks/getActionRecommendations';
import { getCompanyNews } from '@/server/stocks/getCompanyNews';
import { getStockPrice } from '@/server/stocks/getStockPrice';
import { getStockProfile } from '@/server/stocks/getStockProfile';
import { AIAnalysis } from './components/AIAnalysis';
import { BusinessInfo } from './components/BussinessInfo';
import { NewsCarousel } from './components/NewsCarousel/NewsCarousel';
import { Recommendations } from './components/Recommendations';
import StockChart from './components/StockChart';
import { StockHeader } from './components/StockHeader';

export default async function AnalysisPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;

  const stockProfile = await getStockProfile(symbol);

  if (!stockProfile.ticker || !stockProfile.name || !stockProfile.logo) {
    return <div>Stock not found</div>;
  }

  const stockPrice = await getStockPrice(stockProfile.ticker);
  const recommendations = await getActionRecommendations(stockProfile.ticker);
  const news = await getCompanyNews(stockProfile.ticker);

  return (
    <div className="flex flex-col gap-4 pb-10">
      <StockHeader
        symbol={stockProfile.ticker!}
        name={stockProfile.name!}
        logo={stockProfile.logo!}
        price={stockPrice.price!}
        percentChange={stockPrice.percentChange!}
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
