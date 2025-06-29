import { Skeleton } from '@/components/ui/skeleton';
import { InfoCard } from '../InfoCard';

export function RecommendationsSkeleton() {
  return (
    <InfoCard title="Recomendaciones de analistas" className="w-full px-4">
      <div className="h-[470px] w-full px-4">
        <Skeleton className="w-full h-full" />
      </div>
    </InfoCard>
  );
}
