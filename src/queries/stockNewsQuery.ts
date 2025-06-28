import { API_ROUTES } from '@/app/api/apiRoutes';
import { callNextApi } from '@/lib/callNextApi';
import { CompanyNews } from '@/server/types';
import { queryOptions } from '@tanstack/react-query';

export const stockNewsQuery = (symbol: string, queryFn?: () => Promise<CompanyNews>) =>
  queryOptions({
    queryKey: ['stockNews', symbol],
    queryFn: queryFn ?? callNextApi(API_ROUTES.stockNews, { query: { symbol } }),
    staleTime: 30 * 60 * 1000,
  });
