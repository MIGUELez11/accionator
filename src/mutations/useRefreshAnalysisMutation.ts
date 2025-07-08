import { API_ROUTES } from '@/app/api/apiRoutes';
import { callNextApi } from '@/lib/callNextApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRefreshAnalysisMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['analysis', 'refresh'],
    mutationFn: async (symbol: string) => callNextApi(API_ROUTES.refreshAiAnalysis, { query: { symbol } }),
    onSuccess: (_, symbol) => {
      queryClient.invalidateQueries({ queryKey: ['aiAnalysis', symbol] });
    },
  });
}
