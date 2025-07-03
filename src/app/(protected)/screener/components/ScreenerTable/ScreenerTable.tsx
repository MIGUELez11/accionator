import { DataTable } from '@/components/ui/data-table';
import { StockScreenerResponse } from '@/server/stocks/clients/getFinancialmodelingprepClient';
import { useColumns } from './columns';

function useHasAnalysisData(data: StockScreenerResponse[]) {
  return data.some((stock) => stock.techRating || stock.movingAverageRating || stock.oscillatorsRating);
}

export function ScreenerTable({ data }: { data: StockScreenerResponse[] }) {
  const hasAnalysisData = useHasAnalysisData(data);
  const columns = useColumns(hasAnalysisData);

  return <DataTable data={data} columns={columns} />;
}
