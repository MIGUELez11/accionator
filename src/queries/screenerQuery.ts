import { API_ROUTES } from '@/app/api/apiRoutes';
import { callNextApi } from '@/lib/callNextApi';
import { Screeners } from '@/server/types';
import { queryOptions } from '@tanstack/react-query';

export const screenerQuery = (screener: Screeners | null) =>
  queryOptions({
    queryKey: ['screener', screener],
    queryFn: callNextApi(API_ROUTES.screener, {
      query: { screener: screener! },
    }),
    enabled: !!screener,
    staleTime: 60 * 1000,
  });
