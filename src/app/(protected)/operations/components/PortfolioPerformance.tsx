'use client';

import { cn } from '@/lib/utils';
import { convexQuery } from '@convex-dev/react-query';
import { api } from '@convex/_generated/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslate } from '@tolgee/react';

export function PortfolioPerformance() {
  const { data: portfolioPerformance } = useSuspenseQuery(
    convexQuery(api.queries.operations.getInvestmentPerformance, {}),
  );
  const { t } = useTranslate();

  const holdingInvestmentPercentage =
    portfolioPerformance.totalInvestment > 0
      ? (portfolioPerformance.holdingInvestment / portfolioPerformance.totalInvestment) * 100
      : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('view.portfolioPerformance.title')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Invertido */}
        <MetricCard
          title={t('view.portfolioPerformance.totalInvested')}
          value={portfolioPerformance.totalInvestment}
          format="currency"
          className="bg-blue-50 border-blue-200"
        />

        {/* Beneficio de Operaciones Realizadas */}
        <MetricCard
          title={t('view.portfolioPerformance.relativeProfit')}
          value={portfolioPerformance.relativeProfit}
          format="currency"
          className={`${
            portfolioPerformance.relativeProfit >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}
          subtitle={`${portfolioPerformance.relativeProfitPercentage > 0 ? '+' : ''}${(portfolioPerformance.relativeProfitPercentage * 100).toFixed(2)}%`}
          colorizeSubtitle
        />

        {/* Inversión Actual en Cartera */}
        <MetricCard
          title={t('view.portfolioPerformance.holdingInvestment')}
          value={portfolioPerformance.holdingInvestment}
          format="currency"
          className="bg-purple-50 border-purple-200"
          subtitle={`${holdingInvestmentPercentage.toFixed(2)}%`}
        />

        {/* Beneficio Total */}
        <MetricCard
          title={t('view.portfolioPerformance.totalProfit')}
          value={portfolioPerformance.profit}
          format="currency"
          className={`${
            portfolioPerformance.profit >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}
          subtitle={`${portfolioPerformance.profitPercentage > 0 ? '+' : ''}${(portfolioPerformance.profitPercentage * 100).toFixed(2)}%`}
          colorizeSubtitle
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: number;
  format: 'currency' | 'percentage' | 'number';
  className?: string;
  subtitle?: string;
  colorizeSubtitle?: boolean;
}

function MetricCard({ title, value, format, className = '', subtitle, colorizeSubtitle }: MetricCardProps) {
  const formatValue = (val: number, fmt: string) => {
    switch (fmt) {
      case 'currency':
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(val);
      case 'percentage':
        return `${val.toFixed(2)}%`;
      default:
        return val.toLocaleString('es-ES');
    }
  };

  return (
    <div className={`p-6 rounded-lg border ${className}`}>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="text-2xl font-bold text-gray-900">{formatValue(value, format)}</div>
      {subtitle && (
        <div
          className={cn('text-sm mt-1', {
            'text-green-600': colorizeSubtitle && value > 0,
            'text-red-600': colorizeSubtitle && value < 0,
            'text-gray-600': !colorizeSubtitle || value === 0,
          })}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
