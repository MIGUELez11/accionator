import { API_ROUTES } from '@/app/api/apiRoutes';
import { callNextApi } from '@/lib/callNextApi';
import { queryOptions } from '@tanstack/react-query';

export const investmentPlanQuery = queryOptions({
  queryKey: ['investmentPlan'],
  queryFn: callNextApi(API_ROUTES.investmentPlan),
  staleTime: Infinity,
});
