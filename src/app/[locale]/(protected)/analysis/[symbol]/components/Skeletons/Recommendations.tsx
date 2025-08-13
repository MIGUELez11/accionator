import { InfoCard } from '@/components/InfoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { getTranslate } from '@/i18n/tolgee/server';

export async function RecommendationsSkeleton() {
  const t = await getTranslate();

  return (
    <InfoCard title={t('page.analysis.recommendations.title')} className="w-full px-4">
      <div className="h-[470px] w-full px-4">
        <Skeleton className="w-full h-full" />
      </div>
    </InfoCard>
  );
}
