'use client';

import { useConvexPaginatedQuery } from '@convex-dev/react-query';
import { api } from '@convex/_generated/api';
import { Loader2Icon } from 'lucide-react';
import { Suspense, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Operation } from './Operation';
import { OperationError } from './OperationError';
import { OperationSkeleton } from './OperationSkeleton';
import { OperationsEmptyState } from './OperationsEmptyState';

const INITIAL_NUM_ITEMS = 30;
const LOAD_MORE_STEP = 30;

export function OperationsList() {
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
    return <div>Loading...</div>;
  }

  if (isEmpty) {
    return <OperationsEmptyState />;
  }

  return (
    <div className="flex flex-col w-full h-full pr-4 pb-4">
      <Virtuoso
        data={results}
        endReached={() => handleEndReached(canLoadMore, isLoadingMore)}
        increaseViewportBy={200}
        itemContent={(index, operation) => (
          <div className="mb-4">
            <OperationError {...operation} key={operation._id}>
              <Suspense key={operation._id} fallback={<OperationSkeleton />}>
                <Operation operation={operation} />
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
        }}
        style={{ height: '100%', paddingBottom: '100px' }}
      />
    </div>
  );
}
