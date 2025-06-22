import { CompanyNews } from '@/server/stocks/getCompanyNews';
import { InfoCard } from '../InfoCard';
import NewsCard from './components/NewsCard';

interface NewsCarouselProps {
  news: CompanyNews;
}

export function NewsCarousel({ news }: NewsCarouselProps) {
  return (
    <div className="px-4">
      <InfoCard title="News" className="pb-0">
        <div className="grid grid-rows-2 auto-cols-[400px] grid-flow-col gap-8 w-full overflow-x-auto mx-6 pb-4">
          {news.map((newsItem) => (
            <NewsCard key={newsItem.id} new={newsItem} />
          ))}
        </div>
      </InfoCard>
    </div>
  );
}
