import { NewspaperIcon } from 'lucide-react';
import { InfoCard } from '../../../../../../../components/InfoCard';

export default function EmptyState() {
  return (
    <div className="px-4">
      <InfoCard title="News">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <NewspaperIcon className="h-12 w-12" />
          <p className="text-center">No news available</p>
        </div>
      </InfoCard>
    </div>
  );
}
