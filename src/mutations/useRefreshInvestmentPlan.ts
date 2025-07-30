import { API_ROUTES } from '@/app/api/apiRoutes';
import { callNextApi } from '@/lib/callNextApi';
import { investmentPlanQuery } from '@/queries/investmentPlanQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRefreshInvestmentPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['investmentPlan', 'refresh'],
    mutationFn: callNextApi(API_ROUTES.refreshInvestmentPlan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: investmentPlanQuery.queryKey });
    },
  });
}
