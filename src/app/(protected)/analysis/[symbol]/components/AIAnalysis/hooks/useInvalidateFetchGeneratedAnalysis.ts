import { fetchGeneratedAiAnalysisQuery } from '@/queries/fetchGeneratedAiAnalysisQuery';
import { AIAnalysisResponse } from '@/server/types';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useInvalidateFetchGeneratedAnalysis(symbol: string, data: AIAnalysisResponse | undefined | null) {
  const queryClient = useQueryClient();
  const queryKey = fetchGeneratedAiAnalysisQuery(symbol).queryKey;

  useEffect(() => {
    const alreadyGeneratedAnalysis = queryClient.getQueryData<AIAnalysisResponse>(queryKey);
    
    if (data && alreadyGeneratedAnalysis) {
      // Convert both dates to timestamps for proper comparison
      const dataDate = data.date instanceof Date ? data.date.getTime() : new Date(data.date).getTime();
      const cachedDate = alreadyGeneratedAnalysis.date instanceof Date 
        ? alreadyGeneratedAnalysis.date.getTime() 
        : new Date(alreadyGeneratedAnalysis.date).getTime();
      
      // Only invalidate if the dates are actually different (not just different types)
      if (dataDate !== cachedDate) {
        queryClient.invalidateQueries({ queryKey });
      }
    }
  }, [data, queryClient, queryKey]);
}
