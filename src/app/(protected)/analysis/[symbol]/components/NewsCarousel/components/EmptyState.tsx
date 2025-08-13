import { useTranslate } from '@tolgee/react';
import { NewspaperIcon } from 'lucide-react';
import { InfoCard } from '../../../../../../../components/InfoCard';

export default function EmptyState() {
  const { t } = useTranslate();
  return (
    <div className="px-4">
      <InfoCard title={t('page.analysis.news.title')}>
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <NewspaperIcon className="h-12 w-12" />
          <p className="text-center">{t('page.analysis.news.empty')}</p>
        </div>
      </InfoCard>
    </div>
  );
}
