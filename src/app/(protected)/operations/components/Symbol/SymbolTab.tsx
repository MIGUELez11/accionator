'use client';

import { Suspense } from 'react';
import { PortfolioPerformance } from '../PortfolioPerformance';
import { PortfolioPerformanceSkeleton } from '../PortfolioPerformanceSkeleton';
import { SymbolList } from './components/SymbolList';

export function SymbolTab() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="pr-4">
        <Suspense fallback={<PortfolioPerformanceSkeleton />}>
          <PortfolioPerformance />
        </Suspense>
      </div>
      <h2 className="text-lg font-bold">Cartera por símbolo</h2>
      <SymbolList />
    </div>
  );
}
