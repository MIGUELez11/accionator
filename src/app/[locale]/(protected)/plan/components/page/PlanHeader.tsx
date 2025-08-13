'use client';

import { TimePassed } from '@/components/TimePassed';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRefreshInvestmentPlan } from '@/mutations/useRefreshInvestmentPlan';
import { investmentPlanQuery } from '@/queries/investmentPlanQuery';
import { useQuery } from '@tanstack/react-query';
import { useTranslate } from '@tolgee/react';
import { BrainIcon, ClockIcon, RefreshCcwIcon } from 'lucide-react';

interface PlanHeaderProps {
  title: string;
  createdAt: Date;
}

export function PlanHeader({ title, createdAt }: PlanHeaderProps) {
  const { isFetching } = useQuery(investmentPlanQuery);
  const { mutate: refreshInvestmentPlan, isPending: isRefreshing } = useRefreshInvestmentPlan();
  const { t } = useTranslate();

  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BrainIcon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>

        <Button
          variant="outline"
          className={cn('h-8 w-8', {
            'cursor-pointer': !isFetching && !isRefreshing,
            'cursor-not-allowed': isFetching || isRefreshing,
          })}
          onClick={() => refreshInvestmentPlan()}
          disabled={isFetching || isRefreshing}
        >
          <RefreshCcwIcon
            className={cn('h-4 w-4', {
              'animate-spin': isFetching || isRefreshing,
            })}
          />
        </Button>
      </div>

      <div className="flex items-center gap-1 text-muted-foreground">
        <ClockIcon className="w-4 h-4 mr-1" />
        <span>{t('view.planHeader.generated')}</span>
        <TimePassed date={createdAt} className="text-base" />
      </div>
    </header>
  );
}
