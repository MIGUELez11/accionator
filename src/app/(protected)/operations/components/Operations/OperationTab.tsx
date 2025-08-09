import { Suspense } from 'react';
import { PortfolioPerformance } from '../PortfolioPerformance';
import { PortfolioPerformanceSkeleton } from '../PortfolioPerformanceSkeleton';
import { OperationsList } from './components/OperationsList';

export function OperationTab() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="pr-4">
        <Suspense fallback={<PortfolioPerformanceSkeleton />}>
          <PortfolioPerformance />
        </Suspense>
      </div>
      <OperationsList />
    </div>
  );
}
