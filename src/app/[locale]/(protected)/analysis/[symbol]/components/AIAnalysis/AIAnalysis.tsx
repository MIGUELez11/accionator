'use client';

import { EconomicIndicator } from '@/components/EconomicIndicator';
import { InfoCard } from '@/components/InfoCard';
import { TimePassed } from '@/components/TimePassed';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useRefreshAnalysisMutation } from '@/mutations/useRefreshAnalysisMutation';
import { useTranslate } from '@tolgee/react';
import { RefreshCcwIcon } from 'lucide-react';
import { useAIAnalysis } from './hooks/useAIAnalysis';

const SHOULD_SHOW_PRICE = process.env.NEXT_PUBLIC_SHOULD_SHOW_PRICE === 'true';

export function AIAnalysis({ symbol }: { symbol: string }) {
  const { generateAnalysis, shouldGenerate, data, isLoading, isFetching, error } = useAIAnalysis(symbol);
  const refreshAnalysisMutation = useRefreshAnalysisMutation();
  const { t } = useTranslate();

  if (!data && !shouldGenerate) {
    return (
      <InfoCard title={t('page.analysis.aiAnalysis.title')}>
        <div className="h-full w-full px-6">
          <Button onClick={generateAnalysis}>{t('page.analysis.aiAnalysis.generate')}</Button>
        </div>
      </InfoCard>
    );
  }

  if (isLoading) {
    return (
      <InfoCard title={t('page.analysis.aiAnalysis.title')}>
        <div className="h-full w-full px-6">
          <p>{t('page.analysis.aiAnalysis.generating')}</p>
        </div>
      </InfoCard>
    );
  }

  const refreshButton = (
    <Button
      variant="outline"
      className={cn('h-8 w-8', {
        'cursor-pointer': !refreshAnalysisMutation.isPending && !isFetching,
        'cursor-not-allowed': refreshAnalysisMutation.isPending || isFetching,
      })}
      onClick={async () => {
        await refreshAnalysisMutation.mutateAsync(symbol);
        generateAnalysis();
      }}
      disabled={refreshAnalysisMutation.isPending}
    >
      <RefreshCcwIcon className={cn({ 'animate-spin': refreshAnalysisMutation.isPending || isFetching })} />
    </Button>
  );

  if (error) {
    return (
      <InfoCard title={t('page.analysis.aiAnalysis.title')} rightIcon={refreshButton}>
        <div className="h-full w-full px-6">
          <p>
            {t('page.analysis.aiAnalysis.error', {
              message: error.message ?? t('page.analysis.aiAnalysis.unknownError'),
            })}
          </p>
        </div>
      </InfoCard>
    );
  }

  if (!data) {
    return (
      <InfoCard title={t('page.analysis.aiAnalysis.title')}>
        <div className="h-full w-full px-6">
          <p>{t('page.analysis.aiAnalysis.notFound')}</p>
        </div>
      </InfoCard>
    );
  }

  let title = t('page.analysis.aiAnalysis.title');

  if (SHOULD_SHOW_PRICE) {
    const inputTokens = data.action.inputTokens + data.financialAnalysis.inputTokens + data.newsSummary.inputTokens;
    const outputTokens = data.action.outputTokens + data.financialAnalysis.outputTokens + data.newsSummary.outputTokens;
    const pricePerMillionInputTokens = 0.1;
    const pricePerMillionOutputTokens = 0.4;
    const price = (inputTokens / 1e6) * pricePerMillionInputTokens + (outputTokens / 1e6) * pricePerMillionOutputTokens;

    if (price) {
      title += ` (${price.toFixed(4)}$)`;
    }
  }

  let action;
  if (data.action.response.action === 'buy') {
    action = t('common.buy', { defaultValue: 'Comprar' });
  } else if (data.action.response.action === 'doNotBuy') {
    action = t('common.doNotBuy', { defaultValue: 'No comprar' });
  } else {
    action = data.action.response.action;
  }

  return (
    <InfoCard title={title} rightIcon={refreshButton} leftIcon={<TimePassed date={data.date} />}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 px-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium">
              {t('page.analysis.aiAnalysis.actionPlan', { estimatedTime: data.action.response.estimatedTime })}
            </h3>
            {data.action.response.analysis ? <p>{data.action.response.analysis}</p> : null}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <EconomicIndicator
              title={t('page.analysis.aiAnalysis.action')}
              value={action}
              className={data.action.response.action === 'buy' ? 'text-green-600' : 'text-red-600'}
            />
            <EconomicIndicator
              title={t('page.analysis.aiAnalysis.entryRange')}
              value={`$${data.action.response.entryPrice.min.toFixed(2)} - $${data.action.response.entryPrice.max.toFixed(2)}`}
            />
            <EconomicIndicator
              title={t('page.analysis.aiAnalysis.targetPrice')}
              value={`$${data.action.response.desiredPrice.toFixed(2)}`}
              className="text-green-600"
            />
            <EconomicIndicator
              title={t('page.analysis.aiAnalysis.stopLoss')}
              value={`$${data.action.response.stopLoss.toFixed(2)}`}
              className="text-red-600"
            />
            <EconomicIndicator
              title={t('page.analysis.aiAnalysis.potentialProfit')}
              value={`${(data.action.response.profit * 100).toFixed(2)}%`}
              className="text-green-600"
            />
            <EconomicIndicator
              title={t('page.analysis.aiAnalysis.potentialLoss')}
              value={`${(data.action.response.loss * 100).toFixed(2)}%`}
              className="text-red-600"
            />
          </div>
        </div>

        {Object.keys(data.action.response.exitStrategies).length ? (
          <>
            <Separator className="my-2" />

            <div className="flex flex-col gap-4 px-6">
              <h3 className="text-lg font-medium">{t('page.analysis.aiAnalysis.exitStrategy')}</h3>
              <div className="grid gap-3">
                {Object.entries(data.action.response.exitStrategies)
                  .sort(([priceA], [priceB]) => Number(priceA) - Number(priceB))
                  .map(([price, percentage], index) => (
                    <div key={price} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 text-sm font-medium text-white bg-blue-500 rounded-full">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">${Number(price).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">{t('page.analysis.aiAnalysis.objectivePrice')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{(Number(percentage) * 100).toFixed(2)}%</p>
                        <p className="text-sm text-gray-500">{t('page.analysis.aiAnalysis.sell')}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </InfoCard>
  );
}
