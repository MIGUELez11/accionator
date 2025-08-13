import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function StockHeaderSkeleton() {
  return (
    <div className="bg-white z-40 sticky top-16">
      <div className="flex flex-row gap-2 min-w-full justify-between p-4">
        <div className="flex flex-row gap-2 items-center">
          <Skeleton className="w-12 h-12 rounded-sm" />
          <div className="flex flex-col justify-between content-center gap-1">
            <Skeleton className="w-48 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-16 h-4" />
        </div>
      </div>
      <Separator />
    </div>
  );
}
