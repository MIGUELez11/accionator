import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRefreshAnalysisMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['analysis', 'refresh'],
    mutationFn: async (symbol: string) => {
      const response = await fetch(`/api/analysis/refresh?symbol=${symbol}`);
      return response.json();
    },
    onSuccess: (_, symbol) => {
      queryClient.invalidateQueries({ queryKey: ['aiAnalysis', symbol] });
    },
  });
}
