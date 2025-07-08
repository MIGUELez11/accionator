import { API_ROUTES } from '@/app/api/apiRoutes';
import { callNextApi } from '@/lib/callNextApi';
import { queryOptions } from '@tanstack/react-query';

export const fetchGeneratedAiAnalysisQuery = (symbol: string) =>
  queryOptions({
    queryKey: ['fetchGeneratedAiAnalysis', symbol],
    queryFn: callNextApi(API_ROUTES.fetchGeneratedAiAnalysis, { query: { symbol } }),
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  });
