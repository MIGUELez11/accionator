import { API_ROUTES } from '@/app/api/apiRoutes';
import { callNextApi } from '@/lib/callNextApi';
import { queryOptions } from '@tanstack/react-query';

export function stockProfileQuery(symbol: string) {
  return queryOptions({
    queryKey: ['stockProfile', symbol],
    queryFn: callNextApi(API_ROUTES.stockProfile, { query: { symbol } }),
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  });
}