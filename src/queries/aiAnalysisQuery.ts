import { API_ROUTES } from '@/app/api/apiRoutes';
import { callNextApi } from '@/lib/callNextApi';
import { queryOptions } from '@tanstack/react-query';

export const aiAnalysisQuery = (symbol: string) =>
  queryOptions({
    queryKey: ['aiAnalysis', symbol],
    queryFn: callNextApi(API_ROUTES.generateAiAnalysis, { query: { symbol } }),
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  });
