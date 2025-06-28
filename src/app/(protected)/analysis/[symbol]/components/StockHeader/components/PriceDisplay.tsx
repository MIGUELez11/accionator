'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { stockInfoQuery } from '@/queries/stockInfoQuery';
import { useSuspenseQuery } from '@tanstack/react-query';

export function PriceDisplay({ symbol }: { symbol: string }) {
  const {
    data: { price, percentChange },
  } = useSuspenseQuery({ ...stockInfoQuery(symbol), select: (data) => data.price });
  return (
    <>
      {price === undefined ? (
        <Skeleton className="w-24 h-8" />
      ) : (
        <p className="text-2xl font-bold">${(price ?? 0).toFixed(2)}</p>
      )}
      {percentChange === undefined ? (
        <Skeleton className="w-16 h-4" />
      ) : (
        <p
          className={cn({
            'text-green-500': percentChange > 0,
            'text-red-500': percentChange < 0,
            'text-gray-500': !percentChange,
          })}
        >
          {(percentChange ?? 0).toFixed(2)}%
        </p>
      )}
    </>
  );
}
