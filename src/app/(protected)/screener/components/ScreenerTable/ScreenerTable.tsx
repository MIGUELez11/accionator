import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { StockScreenerResponse } from "@/server/stocks/clients/getFinancialmodelingprepClient";

export function ScreenerTable({ data }: { data: StockScreenerResponse[] }) {
  return <DataTable data={data} columns={columns} />;
}
