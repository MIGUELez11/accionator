import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { stockProfileQuery } from '@/queries/stockProfileQuery';
import { TickerPerformance } from '@convex/helpers/operation/investmentPerformance';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslate } from '@tolgee/react';
import Image from 'next/image';
import Link from 'next/link';

export function DataPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col h-full justify-between">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

export function StockInfo({ symbol }: { symbol: string }) {
  const { data: stockProfile } = useSuspenseQuery(stockProfileQuery(symbol));
  const { t } = useTranslate();

  const logo = stockProfile.logo;
  const name = stockProfile.name!;
  const ticker = stockProfile.ticker!;

  return (
    <Link href={`/analysis/${symbol}`} target="_blank" rel="noopener noreferrer">
      <header
        className="flex flex-row gap-2 h-12 cursor-pointer"
        role="link"
        aria-label={t('view.operations.symbolCard.viewAnalysis', { name })}
      >
        {logo ? (
          <Image src={logo} alt={name} width={48} height={48} className="rounded-md" />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">{ticker}</div>
        )}
        <div className="flex flex-col justify-between h-full">
          <h2 className="font-bold line-clamp-1" title={name}>
            {name}
          </h2>
          <p className="text-sm text-gray-500">{ticker}</p>
        </div>
      </header>
    </Link>
  );
}

function getBackgroundColor(value: number) {
  if (value > 0) return 'bg-green-50';
  if (value < 0) return 'bg-red-50';
  return 'bg-blue-50';
}

export function SymbolCard({ symbol, performance }: { symbol: string; performance: TickerPerformance }) {
  const moreSoldThanBought = performance.soldQuantity > performance.buyedQuantity;
  const { t } = useTranslate();

  return (
    <section className="overflow-hidden bg-white border border-gray-100 rounded-xl p-6 shadow-sm transition-all duration-300">
      <div className="flex flex-col gap-6">
        <StockInfo symbol={symbol} />

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 transition-colors">
            <DataPoint
              label={t('view.operations.symbolCard.boughtShares')}
              value={performance.buyedQuantity.toLocaleString()}
            />
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn('bg-gray-50 rounded-lg p-4 transition-colors', {
                  'cursor-help bg-red-200': moreSoldThanBought,
                })}
              >
                <DataPoint
                  label={t('view.operations.symbolCard.soldShares')}
                  value={performance.soldQuantity.toLocaleString()}
                />
              </div>
            </TooltipTrigger>
            {moreSoldThanBought && (
              <TooltipContent>
                <p>
                  {t('view.operations.symbolCard.soldMoreTooltip', {
                    difference: performance.soldQuantity - performance.buyedQuantity,
                  })}
                </p>
              </TooltipContent>
            )}
          </Tooltip>
          <div className="bg-gray-50 rounded-lg p-4 transition-colors">
            <DataPoint
              label={t('view.operations.symbolCard.holdingShares')}
              value={performance.holdingQuantity.toLocaleString()}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 transition-colors">
              <DataPoint
                label={t('view.operations.symbolCard.totalInvestment')}
                value={`$${performance.totalInvestment.toLocaleString()}`}
              />
            </div>
            <div className={`rounded-lg p-4 transition-colors ${getBackgroundColor(performance.profit)}`}>
              <DataPoint
                label={t('view.operations.symbolCard.profit')}
                value={`$${performance.profit.toLocaleString()}`}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className={`rounded-lg p-4 transition-colors ${getBackgroundColor(performance.relativeProfit)}`}>
              <DataPoint
                label={t('view.operations.symbolCard.soldProfit')}
                value={`$${performance.relativeProfit.toLocaleString()}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-lg p-4 transition-colors ${getBackgroundColor(performance.profitPercentage)}`}>
                <DataPoint
                  label={t('view.operations.symbolCard.profitPercentage')}
                  value={`${(performance.profitPercentage * 100).toFixed(2)}%`}
                />
              </div>
              <div
                className={`rounded-lg p-4 transition-colors ${getBackgroundColor(performance.relativeProfitPercentage)}`}
              >
                <DataPoint
                  label={t('view.operations.symbolCard.soldProfitPercentage')}
                  value={`${(performance.relativeProfitPercentage * 100).toFixed(2)}%`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
