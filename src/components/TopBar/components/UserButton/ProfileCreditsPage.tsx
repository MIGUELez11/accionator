import { convexQuery } from '@convex-dev/react-query';
import { api } from '@convex/_generated/api';
import { HistoricalUsage } from '@convex/helpers/tokens/historical/getHistoricalUsage';
import { useQuery } from '@tanstack/react-query';
import { useTranslate } from '@tolgee/react';
import { ActivityIcon, AlignHorizontalDistributeCenterIcon } from 'lucide-react';
import { ProfilePageHeader } from './ProfilePageHeader';
import { ChartCard } from './components/ChartCard';
import { DataCard } from './components/DataCard';
import { RemainingCredits } from './components/RemainingCredits';
import { SectorChart } from './components/SectorChart';
import { UsageChart } from './components/UsageChart';

function useUsageStats(usageStats?: HistoricalUsage[]) {
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      monthName: date.toLocaleString('es-ES', { month: 'long', year: 'numeric' }),
      monthNumber: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }).reverse();

  return last12Months.map((month) => {
    const usage = usageStats?.find((usage) => usage.month === month.monthNumber && usage.year === month.year);

    return {
      month: month.monthName,
      cost: usage?.cost ?? 0,
    };
  });
}
export function ProfileCreditsPage() {
  const { t } = useTranslate();
  const { data: stats, isLoading, error } = useQuery(convexQuery(api.queries.users.getUsageStats, {}));
  const usageData = useUsageStats(stats?.historicalUsage);

  const sectorsData =
    stats?.sectorsSearched.map((sector) => ({
      name: sector.sector,
      queries: sector.count,
    })) ?? [];

  if (isLoading) {
    return <div>{t('page.profile.credits.loading')}</div>;
  }

  if (error) {
    return <div>{t('page.profile.credits.error', { message: error.message })}</div>;
  }

  if (!stats) {
    return <div>{t('page.profile.credits.noStats')}</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <ProfilePageHeader title={t('page.profile.credits.title')} />
      <RemainingCredits
        credits={stats.maxCost}
        usedCredits={stats.cost}
        renewDate={stats.tokens.subscriptionType === 'monthly' ? new Date(stats.tokens.subscriptionRenewDate) : null}
        subscriptionType={stats.tokens.subscriptionType}
      />

      <div className="grid grid-cols-2 gap-4 w-full">
        <DataCard
          title={t('page.profile.credits.stocksAnalyzed')}
          value={stats.stocksSearchedCount}
          icon={AlignHorizontalDistributeCenterIcon}
        />
        <DataCard
          title={t('page.profile.credits.remainingCredits')}
          value={((stats.maxCost - stats.cost) / stats.maxCost) * 100}
          icon={ActivityIcon}
          isPercentage
        />
        <ChartCard title={t('page.profile.credits.mostAnalyzedSectors')}>
          <SectorChart data={sectorsData} />
        </ChartCard>
        <ChartCard title={t('page.profile.credits.usageTrends')}>
          <UsageChart data={usageData} />
        </ChartCard>
      </div>
    </div>
  );
}
