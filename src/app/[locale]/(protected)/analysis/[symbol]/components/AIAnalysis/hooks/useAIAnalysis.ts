import { aiAnalysisQuery } from '@/queries/aiAnalysisQuery';
import { fetchGeneratedAiAnalysisQuery } from '@/queries/fetchGeneratedAiAnalysisQuery';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useInvalidateFetchGeneratedAnalysis } from './useInvalidateFetchGeneratedAnalysis';

export function useAIAnalysis(symbol: string) {
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const { data, isLoading, isFetching, error } = useQuery({
    ...aiAnalysisQuery(symbol),
    enabled: shouldGenerate && !!symbol,
  });

  const { data: alreadyGeneratedAnalysis, isFetching: isFetchingAlreadyGeneratedAnalysis } = useQuery({
    ...fetchGeneratedAiAnalysisQuery(symbol),
    enabled: !!symbol && !data,
  });

  useInvalidateFetchGeneratedAnalysis(symbol, data);
  const dataToDisplay = data ?? alreadyGeneratedAnalysis;

  return {
    shouldGenerate,
    generateAnalysis: () => setShouldGenerate(true),
    data: dataToDisplay,
    isLoading: !dataToDisplay && ((shouldGenerate && isLoading) || isFetchingAlreadyGeneratedAnalysis),
    isFetching,
    error,
  };
}
