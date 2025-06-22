'use client';

import type { CompanyNews } from '@/server/stocks/getCompanyNews';
import { FixedSizeList as List } from 'react-window';
import { InfoCard } from '../InfoCard';
import NewsCard from './components/NewsCard';

interface NewsCarouselProps {
  news: CompanyNews;
}

// These constants are based on the design and layout.
// For a fully responsive component, consider using a custom hook with
// ResizeObserver to dynamically calculate the width.
const LIST_HEIGHT = 224; // (96px card height * 2) + 32px gap
const LIST_WIDTH = 1200; // Based on 1280px max-width - paddings and margins
const COLUMN_WIDTH = 400;
const COLUMN_GAP = 32;
const ITEM_WIDTH = COLUMN_WIDTH + COLUMN_GAP;

export function NewsCarousel({ news }: NewsCarouselProps) {
  const columnCount = Math.ceil(news.length / 2);

  // Renders a column containing one or two news cards.
  const Column = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const itemOne = news[index * 2];
    const itemTwo = news[index * 2 + 1];

    return (
      <div style={style}>
        <div className="flex h-full w-[400px] flex-col gap-8">
          {itemOne && <NewsCard new={itemOne} />}
          {itemTwo && <NewsCard new={itemTwo} />}
        </div>
      </div>
    );
  };

  return (
    <div className="px-4">
      <InfoCard title="News" className="pb-0">
        <div className="mx-6 pb-4">
          <List
            height={LIST_HEIGHT}
            width={LIST_WIDTH}
            itemCount={columnCount}
            itemSize={ITEM_WIDTH}
            layout="horizontal"
          >
            {Column}
          </List>
        </div>
      </InfoCard>
    </div>
  );
}
