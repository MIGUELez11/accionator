import { StockScreenerResponse } from '@/server/stocks/clients/getFinancialmodelingprepClient';
import { ColumnDef } from '@tanstack/react-table';
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

const columns: ColumnDef<StockScreenerResponse>[] = [
  {
    header: 'Company',
    accessorKey: 'symbol',
    cell: ({ row }) => <CompanyRenderer companyName={row.original.companyName} symbol={row.original.symbol} />,
  },
  {
    header: 'Price',
    accessorKey: 'price',
  },
  {
    header: 'Beta',
    accessorKey: 'beta',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value ? value.toFixed(2) : null;
    },
  },
  {
    header: 'Volume',
    accessorKey: 'volume',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value ? `${(value / 1e6).toFixed(2)}M` : null;
    },
  },
  {
    header: 'Capitalization',
    accessorKey: 'marketCap',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value ? `$${(value / 1e9).toFixed(2)}B` : null;
    },
  },
  {
    header: 'Sector',
    accessorKey: 'sector',
  },
  {
    header: 'Country',
    accessorKey: 'country',
  },
  {
    header: 'Last dividend',
    accessorKey: 'lastAnnualDividend',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value ? `$${value.toFixed(2)}` : null;
    },
  },
];

const AnalysisColumns: ColumnDef<StockScreenerResponse>[] = [
  {
    header: 'Analyst Rating',
    accessorKey: 'analystsRating',
    cell: AnalysisColumnRenderer,
  },
  {
    header: 'Tech Rating',
    accessorKey: 'techRating',
    cell: AnalysisColumnRenderer,
  },
  {
    header: 'Moving Average Rating',
    accessorKey: 'movingAverageRating',
    cell: AnalysisColumnRenderer,
  },
  {
    header: 'Oscillators Rating',
    accessorKey: 'oscillatorsRating',
    cell: AnalysisColumnRenderer,
  },
];

export function useColumns(hasAnalysisData: boolean) {
  return useMemo(() => {
    if (hasAnalysisData) {
      return [...columns.slice(0, 4), ...AnalysisColumns, ...columns.slice(4)];
    }

    return columns;
  }, [hasAnalysisData]);
}
