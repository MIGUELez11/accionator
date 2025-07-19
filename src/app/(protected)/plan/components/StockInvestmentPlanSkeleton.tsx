import { Skeleton } from '@/components/ui/skeleton';

export function StockInvestmentPlanSkeleton() {
  return (
    <article className="flex flex-col gap-4 h-full justify-between py-4 border shadow-sm rounded-lg">
      <div className="flex flex-col gap-4 max-h-[452px] overflow-y-auto px-4">
        <header className="flex gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex justify-center items-end flex-col gap-1">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </header>

        <Skeleton className="h-20 w-full" />

        <div className="flex items-center justify-center p-3 bg-muted/30 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <div className="flex flex-col gap-1">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-2 h-2 rounded-full" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="px-4">
        <Skeleton className="h-10 w-full" />
      </div>
    </article>
  );
}
