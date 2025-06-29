import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { InfoCard } from '../InfoCard';

export function BusinessInfoSkeleton() {
  return (
    <InfoCard title="Business Info" className="h-full overflow-hidden pb-0">
      <div className="grid grid-cols-2 gap-4 px-6">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
      </div>
      <div className="h-full">
        <Separator />
        <div className="flex flex-row gap-4 items-center min-h-full px-6">
          <Skeleton className="w-full h-4" />
        </div>
      </div>
    </InfoCard>
  );
}
