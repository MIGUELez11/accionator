'use client';

import { stockNewsQuery } from '@/queries/stockNewsQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslate } from '@tolgee/react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { InfoCard } from '../../../../../../components/InfoCard';
import EmptyState from './components/EmptyState';
import NewsCard from './components/NewsCard';

interface NewsCarouselProps {
  symbol: string;
}

// These constants are based on the design and layout.
const COLUMN_WIDTH = 400;
const COLUMN_GAP = 32;
const ITEM_WIDTH = COLUMN_WIDTH + COLUMN_GAP;

export function NewsCarousel({ symbol }: NewsCarouselProps) {
  const { data: news } = useSuspenseQuery(stockNewsQuery(symbol));
  const { t } = useTranslate();
  const columnCount = Math.ceil(news.length / 2);

  if (!news.length) {
    return <EmptyState />;
  }

  // Renders a column containing one or two news cards.
  const Column = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const itemOne = news[index * 2];
    const itemTwo = news[index * 2 + 1];

    return (
      <div style={style}>
        <div className="flex h-full w-[400px] flex-col gap-8">
          {itemOne && <NewsCard newItem={itemOne} />}
          {itemTwo && <NewsCard newItem={itemTwo} />}
        </div>
      </div>
    );
  };

  return (
    <div className="px-4">
      <InfoCard title={t('page.analysis.news.title')} className="pb-0">
        <div className="mx-6 h-[256px]">
          <AutoSizer>
            {({ width }) => (
              <List height={256} width={width} itemCount={columnCount} itemSize={ITEM_WIDTH} layout="horizontal">
                {Column}
              </List>
            )}
          </AutoSizer>
        </div>
      </InfoCard>
    </div>
  );
}
