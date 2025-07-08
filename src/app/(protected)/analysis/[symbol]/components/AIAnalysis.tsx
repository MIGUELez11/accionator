'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useRefreshAnalysisMutation } from '@/mutations/useRefreshAnalysisMutation';
import { aiAnalysisQuery } from '@/queries/aiAnalysisQuery';
import { fetchGeneratedAiAnalysisQuery } from '@/queries/fetchGeneratedAiAnalysisQuery';
import { useQuery } from '@tanstack/react-query';
import { RefreshCcwIcon } from 'lucide-react';
import { useState } from 'react';
import { EconomicIndicator } from './EconomicIndicator';
import { InfoCard } from './InfoCard';

function getSinceDate(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const formatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

  let since;
  if (diffMs < 1000 * 60) {
    // less than a minute
    since = formatter.format(-Math.floor(diffMs / 1000), 'seconds');
  } else if (diffMs < 1000 * 60 * 60) {
    // less than an hour
    since = formatter.format(-Math.floor(diffMs / (1000 * 60)), 'minutes');
  } else if (diffMs < 1000 * 60 * 60 * 24) {
    // less than a day
    since = formatter.format(-Math.floor(diffMs / (1000 * 60 * 60)), 'hours');
  } else {
    since = formatter.format(-Math.floor(diffMs / (1000 * 60 * 60 * 24)), 'days');
  }

  return since;
}

function useAIAnalysis(symbol: string) {
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const {
    data,
    isFetching: isLoading,
    error,
  } = useQuery({
    ...aiAnalysisQuery(symbol),
    enabled: shouldGenerate && !!symbol,
    select: (data) => ({
      ...data,
      since: getSinceDate(new Date(data.date)),
    }),
  });

  const { data: alreadyGeneratedAnalysis, isFetching: isFetchingAlreadyGeneratedAnalysis } = useQuery({
    ...fetchGeneratedAiAnalysisQuery(symbol),
    enabled: !!symbol,
    select: (data) => {
      if (!data) {
        return null;
      }

      return {
        ...data,
        since: getSinceDate(new Date(data.date)),
      };
    },
  });

  return {
    shouldGenerate,
    generateAnalysis: () => {
      setShouldGenerate(true);
    },
    data: data ?? alreadyGeneratedAnalysis,
    isLoading: (shouldGenerate && isLoading) || isFetchingAlreadyGeneratedAnalysis,
    error,
  };
}

export function AIAnalysis({ symbol }: { symbol: string }) {
  const { generateAnalysis, shouldGenerate, data, isLoading, error } = useAIAnalysis(symbol);
  const refreshAnalysisMutation = useRefreshAnalysisMutation();

  if (!data && !shouldGenerate) {
    return (
      <InfoCard title="Recomendación IA">
        <div className="h-full w-full px-6">
          <Button onClick={generateAnalysis}>Generar análisis</Button>
        </div>
      </InfoCard>
    );
  }

  if (isLoading) {
    return (
      <InfoCard title="Recomendación IA">
        <div className="h-full w-full px-6">
          <p>Generando análisis...</p>
        </div>
      </InfoCard>
    );
  }

  const refreshButton = (
    <Button
      variant="outline"
      className={'h-8 w-8 cursor-pointer'}
      onClick={() => refreshAnalysisMutation.mutate(symbol)}
      disabled={refreshAnalysisMutation.isPending}
    >
      <RefreshCcwIcon className={cn({ 'animate-spin': refreshAnalysisMutation.isPending })} />
    </Button>
  );

  if (error) {
    return (
      <InfoCard title="Recomendación IA" rightIcon={refreshButton}>
        <div className="h-full w-full px-6">
          <p>Error al generar análisis: {error.message ? error.message : 'error desconocido'}</p>
        </div>
      </InfoCard>
    );
  }

  if (!data) {
    return (
      <InfoCard title="Recomendación IA">
        <div className="h-full w-full px-6">
          <p>No se encontró ningún análisis</p>
        </div>
      </InfoCard>
    );
  }

  const inputTokens = data.action.inputTokens + data.financialAnalysis.inputTokens + data.newsSummary.inputTokens;
  const outputTokens = data.action.outputTokens + data.financialAnalysis.outputTokens + data.newsSummary.outputTokens;
  const pricePerMillionInputTokens = 0.1;
  const pricePerMillionOutputTokens = 0.4;
  const price = (inputTokens / 1e6) * pricePerMillionInputTokens + (outputTokens / 1e6) * pricePerMillionOutputTokens;

  let title = 'Recomendación IA';

  if (price) {
    title += ` (${price.toFixed(4)}$)`;
  }

  if (data.since) {
    title += ` | ${data.since}`;
  } else if (data.date) {
    title += ` | ${new Date(data.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  }

  let action;
  if (data.action.response.action === 'buy') {
    action = 'Comprar';
  } else if (data.action.response.action === 'doNotBuy') {
    action = 'No comprar';
  } else {
    action = data.action.response.action;
  }

  return (
    <InfoCard title={title} rightIcon={refreshButton}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 px-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium">Plan de acción ({data.action.response.estimatedTime})</h3>
            {data.action.response.analysis ? <p>{data.action.response.analysis}</p> : null}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <EconomicIndicator
              title="Acción"
              value={action}
              className={data.action.response.action === 'buy' ? 'text-green-600' : 'text-red-600'}
            />
            <EconomicIndicator
              title="Rango de entrada"
              value={`$${data.action.response.entryPrice.min.toFixed(2)} - $${data.action.response.entryPrice.max.toFixed(2)}`}
            />
            <EconomicIndicator
              title="Precio objetivo"
              value={`$${data.action.response.desiredPrice.toFixed(2)}`}
              className="text-green-600"
            />
            <EconomicIndicator
              title="Stop loss"
              value={`$${data.action.response.stopLoss.toFixed(2)}`}
              className="text-red-600"
            />
            <EconomicIndicator
              title="Beneficio potencial"
              value={`${(data.action.response.profit * 100).toFixed(2)}%`}
              className="text-green-600"
            />
            <EconomicIndicator
              title="Pérdida potencial"
              value={`${(data.action.response.loss * 100).toFixed(2)}%`}
              className="text-red-600"
            />
          </div>
        </div>

        {Object.keys(data.action.response.exitStrategies).length ? (
          <>
            <Separator className="my-2" />

            <div className="flex flex-col gap-4 px-6">
              <h3 className="text-lg font-medium">Estrategia de salida</h3>
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
                          <p className="text-sm text-gray-500">Precio objetivo</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{(Number(percentage) * 100).toFixed(2)}%</p>
                        <p className="text-sm text-gray-500">Vender</p>
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
