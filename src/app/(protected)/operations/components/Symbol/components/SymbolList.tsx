import { useConvexPaginatedQuery } from '@convex-dev/react-query';
import { api } from '@convex/_generated/api';
import { Loader2Icon } from 'lucide-react';
import { Suspense, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { OperationsEmptyState } from '../../OperationsEmptyState';
import { SymbolCard } from './SymbolCard';

const INITIAL_NUM_ITEMS = 10;
const LOAD_MORE_STEP = 10;

export function SymbolList() {
  const { results, loadMore, status } = useConvexPaginatedQuery(
    api.queries.operations.paginateBySymbol,
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

  if (isEmpty || isLoadingFirstPage) {
    return <OperationsEmptyState />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Virtuoso
        data={results}
        endReached={() => handleEndReached(canLoadMore, isLoadingMore)}
        increaseViewportBy={200}
        itemContent={(index, result) => (
          <div className="mb-4">
            <Suspense key={result.symbol} fallback={<div>Loading...</div>}>
              <SymbolCard symbol={result.symbol} performance={result.performance} />
            </Suspense>
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
          List: (props) => <div className="pr-4" {...props} />,
        }}
      />
    </div>
  );
}
