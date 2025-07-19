'use client';

import { InvestmentPlanResponse } from '@/server/types';
import { Suspense, useMemo } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { StockInvestmentErrorBoundary } from './StockInvestmentErrorBoundary';
import { StockInvestmentPlan } from './StockInvestmentPlan';
import { StockInvestmentPlanSkeleton } from './StockInvestmentPlanSkeleton';

const COLUMN_WIDTH = 350;
const COLUMN_HEIGHT = 564;
const COLUMN_GAP = 16;
const ITEM_WIDTH = COLUMN_WIDTH + COLUMN_GAP;

export function StocksList({ data }: { data: InvestmentPlanResponse['response']['investmentSuggestions'] }) {
  const sortedData = useMemo(() => data.sort((a, b) => b.quantityToInvest - a.quantityToInvest), [data]);

  const Column = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = sortedData[index];

    return (
      <div style={style}>
        <div style={{ width: COLUMN_WIDTH, height: COLUMN_HEIGHT - 16 }}>
          <StockInvestmentErrorBoundary symbol={item.symbol}>
            <Suspense fallback={<StockInvestmentPlanSkeleton />}>
              <StockInvestmentPlan plan={item} />
            </Suspense>
          </StockInvestmentErrorBoundary>
        </div>
      </div>
    );
  };

  return (
    <section className="flex flex-col gap-4 mb-16">
      <h2 className="text-lg font-bold">Acciones</h2>
      <div className="mr-4 h-[512px]">
        <AutoSizer>
          {({ width }) => (
            <List
              height={COLUMN_HEIGHT}
              width={width}
              itemCount={sortedData.length}
              itemSize={ITEM_WIDTH}
              layout="horizontal"
            >
              {Column}
            </List>
          )}
        </AutoSizer>
      </div>
    </section>
  );
}
