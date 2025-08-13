import { Skeleton } from '@/components/ui/skeleton';
import { useTranslate } from '@tolgee/react';
import { InfoCard } from '../../../../../../components/InfoCard';

export function NewsCarouselSkeleton() {
  const { t } = useTranslate();
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
