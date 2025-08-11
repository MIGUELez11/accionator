import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { Suspense } from 'react';
import { PortfolioPerformance } from '../PortfolioPerformance';
import { PortfolioPerformanceSkeleton } from '../PortfolioPerformanceSkeleton';
import { OperationsList } from './components/OperationsList';

interface OperationTabProps {
  onEditOperation?: (operation: (typeof api.queries.operations.listOperations._returnType)['page'][number]) => void;
  editingOperationId?: Id<'operations'> | null;
}

export function OperationTab({ onEditOperation, editingOperationId }: OperationTabProps) {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="pr-4">
        <Suspense fallback={<PortfolioPerformanceSkeleton />}>
          <PortfolioPerformance />
        </Suspense>
      </div>
      <h2 className="text-lg font-bold">Cartera</h2>
      <OperationsList onEditOperation={onEditOperation} editingOperationId={editingOperationId} />
    </div>
  );
}
