import { API_ROUTES } from '@/app/api/apiRoutes';
import { callNextApi } from '@/lib/callNextApi';
import { queryOptions } from '@tanstack/react-query';

export const investmentPlanQuery = (investmentCapital: number) =>
  queryOptions({
    queryKey: ['investmentPlan', investmentCapital],
    queryFn: callNextApi(API_ROUTES.investmentPlan, { query: { investmentCapital } }),
    staleTime: Infinity,
  });
