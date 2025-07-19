'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { stockInfoQuery } from '@/queries/stockInfoQuery';
import { InvestmentPlanResponse } from '@/server/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { EconomicIndicator } from '../../../../components/EconomicIndicator';

export function StockInvestmentPlan({
  plan,
}: {
  plan: InvestmentPlanResponse['response']['investmentSuggestions'][number];
}) {
  const { data: stockInfo } = useSuspenseQuery(stockInfoQuery(plan.symbol));

  return (
    <article
      aria-roledescription={`${plan.symbol} investment plan`}
      className="flex flex-col gap-4 h-full justify-between py-4 border shadow-sm rounded-lg "
    >
      <div className="flex flex-col gap-4 max-h-[452px] overflow-y-auto px-4">
        <header className="flex gap-2 justify-between">
          <div className="flex items-center gap-2">
            {stockInfo.stockProfile.logo ? (
              <Image
                src={stockInfo.stockProfile.logo}
                alt={stockInfo.stockProfile.name ?? plan.symbol}
                width={48}
                height={48}
              />
            ) : (
              <div className="w-10 h-10 bg-muted rounded-full" />
            )}
            <div className="flex flex-col">
              <h3 className="text-lg font-bold line-clamp-1">{stockInfo.stockProfile.name}</h3>
              <p className="text-sm text-muted-foreground">{stockInfo.stockProfile.ticker}</p>
            </div>
          </div>
          <div className="flex justify-center items-end flex-col">
            <p className="text-lg font-bold">${stockInfo.price.price}</p>
            <p
              className={cn({
                'text-green-500': stockInfo.price.percentChange && stockInfo.price.percentChange > 0,
                'text-red-500': stockInfo.price.percentChange && stockInfo.price.percentChange < 0,
                'text-muted-foreground': !stockInfo.price.percentChange,
              })}
            >
              {stockInfo.price.percentChange?.toFixed(2)}%
            </p>
          </div>
        </header>

        <p className="text-sm text-muted-foreground">{plan.stockAnalysisSummary}</p>

        <div className="flex items-center justify-center p-3 bg-muted/30 rounded-lg">
          <div className="flex flex-col items-center">
            <p className="text-xs text-muted-foreground">Rango de entrada</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">${plan.entryPriceMin}</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-xl font-bold">${plan.entryPriceMax}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <EconomicIndicator title="Cantidad" value={`$${plan.quantityToInvest}`} />
          <EconomicIndicator title="Stop Loss" value={`$${plan.stopLossPrice}`} className="text-red-500" />
          <EconomicIndicator title="Duración" value={plan.estimatedTime} className="line-clamp-1" />
          <EconomicIndicator
            title="Beneficio est."
            value={`${(plan.estimatedProfitPercentage * 100).toFixed(2)}%`}
            className="text-green-500"
          />
          <EconomicIndicator
            title="Pérdida est."
            value={`${(plan.estimatedLossPercentage * 100).toFixed(2)}%`}
            className="text-red-500"
          />
          <EconomicIndicator title="Prob. Beneficio" value={`${(plan.profitProbability * 100).toFixed(2)}%`} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Estrategia de salida</p>
          <div className="flex flex-col gap-1">
            {plan.exitStrategy
              .sort((a, b) => a.price - b.price)
              .map((strategy, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-medium">${strategy.price}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {(strategy.percentage * 100).toFixed(0)}% del capital
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Link href={`/analysis/${plan.symbol}`} target="_blank" className="px-4">
        <Button variant="outline" className="w-full cursor-pointer">
          Ver análisis
          <ExternalLinkIcon className="w-4 h-4" />
        </Button>
      </Link>
    </article>
  );
}
