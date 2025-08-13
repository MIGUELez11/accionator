import { fetchGeneratedAiAnalysisQuery } from '@/queries/fetchGeneratedAiAnalysisQuery';
import { AIAnalysisResponse } from '@/server/types';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useInvalidateFetchGeneratedAnalysis(symbol: string, data: AIAnalysisResponse | undefined | null) {
  const queryClient = useQueryClient();
  const queryKey = fetchGeneratedAiAnalysisQuery(symbol).queryKey;

  useEffect(() => {
    const alreadyGeneratedAnalysis = queryClient.getQueryData<AIAnalysisResponse>(queryKey);
    if (data && alreadyGeneratedAnalysis?.date !== data.date) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [data, queryClient, queryKey]);
}
