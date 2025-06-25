import { callNextApi } from '@/lib/callNextApi';
import { StockScreenerResponse } from '@/server/stocks/clients/getFinancialmodelingprepClient';
import { queryOptions } from '@tanstack/react-query';

export const screenerQuery = (screener: string | null) =>
  queryOptions({
    queryKey: ['screener', screener],
    queryFn: callNextApi<StockScreenerResponse>(`/api/screener?screener=${screener}`),
    enabled: !!screener,
    staleTime: 60 * 1000,
  });
