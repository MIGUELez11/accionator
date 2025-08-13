import { Skeleton } from '@/components/ui/skeleton';
import { getTranslate } from '@/i18n/tolgee/server';
import { InfoCard } from '../../../../../../../components/InfoCard';

export async function NewsCarouselSkeleton() {
  const t = await getTranslate();
  return (
    <div className="px-4">
      <InfoCard title={t('page.analysis.news.title')}>
        <div className="mx-6 h-[256px]">
          <Skeleton className="h-full w-full" />
        </div>
      </InfoCard>
    </div>
  );
}
