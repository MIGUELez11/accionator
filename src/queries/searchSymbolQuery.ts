import { API_ROUTES } from '@/app/api/apiRoutes';
import { callNextApi } from '@/lib/callNextApi';
import { queryOptions } from '@tanstack/react-query';

export const searchSymbolQuery = (query: string) =>
  queryOptions({
    queryKey: ['stocksSearch', query],
    queryFn: callNextApi(API_ROUTES.stocksSearch, {
      query: {
        query,
        exchange: 'NASDAQ',
      },
    }),
  });
