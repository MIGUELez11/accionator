import { Skeleton } from '@/components/ui/skeleton';
import { InfoCard } from '../../../../../../components/InfoCard';

export function NewsCarouselSkeleton() {
  return (
    <div className="px-4">
      <InfoCard title="News">
        <div className="mx-6 h-[256px]">
          <Skeleton className="h-full w-full" />
        </div>
      </InfoCard>
    </div>
  );
}
