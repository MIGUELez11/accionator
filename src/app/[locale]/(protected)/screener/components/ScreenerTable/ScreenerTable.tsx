'use client';

import { DataTable } from '@/components/ui/data-table';
import { StockScreenerResponse } from '@/server/stocks/clients/getFinancialmodelingprepClient';
import { useRouter } from 'next/navigation';
import { useColumns } from './columns';

function useHasAnalysisData(data: StockScreenerResponse[]) {
  return data.some((stock) => stock.techRating || stock.movingAverageRating || stock.oscillatorsRating);
}

export function ScreenerTable({ data }: { data: StockScreenerResponse[] }) {
  const hasAnalysisData = useHasAnalysisData(data);
  const columns = useColumns(hasAnalysisData);
  const router = useRouter();

  return (
    <DataTable
      data={data}
      columns={columns}
      onRowClick={({ symbol }) => {
        return router.push(`/analysis/${symbol}`);
      }}
    />
  );
}
