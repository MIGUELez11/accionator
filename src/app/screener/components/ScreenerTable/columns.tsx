import { StockScreenerResponse } from "@/server/stocks/clients/getFinancialmodelingprepClient";
import { ColumnDef } from "@tanstack/react-table";
import { CompanyRenderer } from "./components/CompanyRenderer";

export const columns: ColumnDef<StockScreenerResponse>[] = [
  {
    header: "Company",
    accessorKey: "symbol",
    cell: ({ row }) => <CompanyRenderer companyName={row.original.companyName} symbol={row.original.symbol} />,
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Volume",
    accessorKey: "volume",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value ? `$${(value / 10e6).toFixed(2)}M` : null;
    },
  },
  {
    header: "Capitalization",
    accessorKey: "capitalization",
    cell: ({ getValue }) => getValue<number>() ? `$${getValue<number>()}` : null,
  },
  {
    header: "Beta",
    accessorKey: "beta",
  },
  {
    header: "Sector",
    accessorKey: "sector",
  },
  {
    header: "Country",
    accessorKey: "country",
  },
  {
    header: "Last dividend",
    accessorKey: "lastDividend",
    cell: ({ getValue }) => getValue<number>() ? `$${getValue<number>()}` : null,
  },
]