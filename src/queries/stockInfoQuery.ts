import { callNextApi } from '@/lib/callNextApi';
import { StockInfo } from '@/server/types';
import { queryOptions } from '@tanstack/react-query';

export const stockInfoQuery = (symbol: string, queryFn?: () => Promise<StockInfo>) =>
  queryOptions({
    queryKey: ['stockInfo', symbol],
    queryFn: queryFn ?? callNextApi<StockInfo>(`/api/stocks?symbol=${symbol}`),
    staleTime: 5 * 60 * 1000,
  });
