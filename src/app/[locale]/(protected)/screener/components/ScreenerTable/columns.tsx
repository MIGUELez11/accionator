import { StockScreenerResponse } from '@/server/stocks/clients/getFinancialmodelingprepClient';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslate } from '@tolgee/react';
import { ArrowDownRightIcon, ArrowRightIcon, ArrowUpRightIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { useMemo } from 'react';
import { CompanyRenderer } from './components/CompanyRenderer';

export type Rating = 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';

function AnalysisColumnRenderer({ getValue }: { getValue: () => unknown }) {
  const value = getValue() as Rating;

  const color = useMemo(() => {
    switch (value) {
      case 'Strong Buy':
        return 'text-green-600';
      case 'Buy':
        return 'text-green-800';
      case 'Hold':
        return 'text-yellow-800';
      case 'Sell':
        return 'text-red-800';
      case 'Strong Sell':
        return 'text-red-600';
    }
  }, [value]);

  const Icon = useMemo(() => {
    switch (value) {
      case 'Strong Buy':
        return TrendingUpIcon;
      case 'Buy':
        return ArrowUpRightIcon;
      case 'Hold':
        return ArrowRightIcon;
      case 'Sell':
        return ArrowDownRightIcon;
      case 'Strong Sell':
        return TrendingDownIcon;
    }
  }, [value]);

  return (
    <div className="flex items-center gap-2">
      <Icon className={color} size={16} />
      <span className={color}>{value}</span>
    </div>
  );
}

function useColumnsBase(): ColumnDef<StockScreenerResponse>[] {
  const { t } = useTranslate();
  return [
    {
      header: t('view.screenerTable.columns.company'),
      accessorKey: 'symbol',
      cell: ({ row }) => <CompanyRenderer companyName={row.original.companyName} symbol={row.original.symbol} />,
    },
    {
      header: t('view.screenerTable.columns.price'),
      accessorKey: 'price',
    },
    {
      header: t('view.screenerTable.columns.beta'),
      accessorKey: 'beta',
      cell: ({ getValue }) => {
        const value = getValue<number>();
        return value ? value.toFixed(2) : null;
      },
    },
    {
      header: t('view.screenerTable.columns.volume'),
      accessorKey: 'volume',
      cell: ({ getValue }) => {
        const value = getValue<number>();
        return value ? `${(value / 1e6).toFixed(2)}M` : null;
      },
    },
    {
      header: t('view.screenerTable.columns.capitalization'),
      accessorKey: 'marketCap',
      cell: ({ getValue }) => {
        const value = getValue<number>();
        return value ? `$${(value / 1e9).toFixed(2)}B` : null;
      },
    },
    {
      header: t('view.screenerTable.columns.sector'),
      accessorKey: 'sector',
    },
    {
      header: t('view.screenerTable.columns.country'),
      accessorKey: 'country',
    },
    {
      header: t('view.screenerTable.columns.lastDividend'),
      accessorKey: 'lastAnnualDividend',
      cell: ({ getValue }) => {
        const value = getValue<number>();
        return value ? `$${value.toFixed(2)}` : null;
      },
    },
  ];
}

function useAnalysisColumns(): ColumnDef<StockScreenerResponse>[] {
  const { t } = useTranslate();
  return [
    {
      header: t('view.screenerTable.columns.analystRating'),
      accessorKey: 'analystsRating',
      cell: AnalysisColumnRenderer,
    },
    {
      header: t('view.screenerTable.columns.techRating'),
      accessorKey: 'techRating',
      cell: AnalysisColumnRenderer,
    },
    {
      header: t('view.screenerTable.columns.movingAverageRating'),
      accessorKey: 'movingAverageRating',
      cell: AnalysisColumnRenderer,
    },
    {
      header: t('view.screenerTable.columns.oscillatorsRating'),
      accessorKey: 'oscillatorsRating',
      cell: AnalysisColumnRenderer,
    },
  ];
}

export function useColumns(hasAnalysisData: boolean) {
  const columns = useColumnsBase();
  const analysisColumns = useAnalysisColumns();

  return useMemo(() => {
    if (hasAnalysisData) {
      return [...columns.slice(0, 4), ...analysisColumns, ...columns.slice(4)];
    }
    return columns;
  }, [hasAnalysisData, columns, analysisColumns]);
}
