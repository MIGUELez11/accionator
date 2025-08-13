import { Skeleton } from '@/components/ui/skeleton';
import { useTranslate } from '@tolgee/react';

export function PortfolioPerformanceSkeleton() {
  const { t } = useTranslate();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('view.portfolioPerformance.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Invertido */}
        <div className="p-6 rounded-lg border bg-blue-50 border-blue-200">
          <Skeleton className="h-4 w-24 mb-2" /> {/* Title */}
          <Skeleton className="h-8 w-32" /> {/* Value */}
        </div>

        {/* Beneficio de Operaciones Realizadas */}
        <div className="p-6 rounded-lg border bg-green-50 border-green-200">
          <Skeleton className="h-4 w-48 mb-2" /> {/* Title */}
          <Skeleton className="h-8 w-32" /> {/* Value */}
          <Skeleton className="h-4 w-16 mt-1" /> {/* Subtitle */}
        </div>

        {/* Inversión Actual en Cartera */}
        <div className="p-6 rounded-lg border bg-purple-50 border-purple-200">
          <Skeleton className="h-4 w-40 mb-2" /> {/* Title */}
          <Skeleton className="h-8 w-32" /> {/* Value */}
          <Skeleton className="h-4 w-16 mt-1" /> {/* Subtitle */}
        </div>

        {/* Beneficio Total */}
        <div className="p-6 rounded-lg border bg-green-50 border-green-200">
          <Skeleton className="h-4 w-28 mb-2" /> {/* Title */}
          <Skeleton className="h-8 w-32" /> {/* Value */}
          <Skeleton className="h-4 w-16 mt-1" /> {/* Subtitle */}
        </div>
      </div>
    </div>
  );
}
