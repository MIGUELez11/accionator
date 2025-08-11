'use client';

import { useConvexPaginatedQuery } from '@convex-dev/react-query';
import { api } from '@convex/_generated/api';
import { Id } from '@convex/_generated/dataModel';
import { Loader2Icon } from 'lucide-react';
import { Suspense, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { OperationsEmptyState } from '../../OperationsEmptyState';
import { Operation } from './Operation';
import { OperationError } from './OperationError';
import { OperationSkeleton } from './OperationSkeleton';

const INITIAL_NUM_ITEMS = 30;
const LOAD_MORE_STEP = 30;

interface OperationsListProps {
  onEditOperation?: (operation: (typeof api.queries.operations.listOperations._returnType)['page'][number]) => void;
  editingOperationId?: Id<'operations'> | null;
}

export function OperationsList({ onEditOperation, editingOperationId }: OperationsListProps) {
  const { results, loadMore, status } = useConvexPaginatedQuery(
    api.queries.operations.listOperations,
    {},
    {
      initialNumItems: INITIAL_NUM_ITEMS,
    },
  );

  const isLoadingFirstPage = status === 'LoadingFirstPage';
  const isLoadingMore = status === 'LoadingMore';
  const canLoadMore = status === 'CanLoadMore';
  const isEmpty = results.length === 0;

  const handleEndReached = useCallback(
    (canLoadMore: boolean, isLoadingMore: boolean) => {
      if (canLoadMore && !isLoadingMore) {
        loadMore(LOAD_MORE_STEP);
      }
    },
    [loadMore],
  );

  if (isLoadingFirstPage) {
    return (
      <div className="flex h-full items-center justify-center py-8">
        <Loader2Icon className="w-5 h-5 animate-spin text-gray-400" />
      </div>
    );
  }
  if (isEmpty) {
    return <OperationsEmptyState />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Virtuoso
        data={results}
        endReached={() => handleEndReached(canLoadMore, isLoadingMore)}
        increaseViewportBy={200}
        itemContent={(index, operation) => (
          <div className="mb-4">
            <OperationError {...operation} onEdit={() => onEditOperation?.(operation)} key={operation._id}>
              <Suspense key={operation._id} fallback={<OperationSkeleton />}>
                <Operation
                  operation={operation}
                  onEdit={() => onEditOperation?.(operation)}
                  isEditing={editingOperationId === operation._id}
                />
              </Suspense>
            </OperationError>
          </div>
        )}
        components={{
          Footer: () =>
            status === 'CanLoadMore' || isLoadingMore ? (
              <div className="flex justify-center py-4">
                <div className="flex items-center gap-2 text-gray-500">
                  {isLoadingMore && <Loader2Icon className="w-4 h-4 animate-spin" />}
                  {isLoadingMore ? 'Cargando más...' : 'Desplaza para cargar más'}
                </div>
              </div>
            ) : null,
          List: (props) => <div {...props} className="h-full overflow-y-auto pr-4" />,
        }}
      />
    </div>
  );
}
