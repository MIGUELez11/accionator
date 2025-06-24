import { queryOptions } from "@tanstack/react-query";

interface SummaryResponse<
  parseAsObject = false,
  R extends parseAsObject extends false
    ? string
    : object = parseAsObject extends false ? string : object,
> {
  response: R;
  inputTokens: number;
  outputTokens: number;
}

interface ShouldBuyActionResponse {
  action: "buy" | "doNotBuy";
  entryPrice: {
    min: number;
    max: number;
  };
  desiredPrice: number;
  exitStrategies: Record<number, number>;
  stopLoss: number;
  analysis: string;
  estimatedTime: string;
  profit: number;
  loss: number;
}

interface AIAnalysisResponse {
  newsSummary: SummaryResponse;
  financialAnalysis: SummaryResponse;
  action: SummaryResponse<true, ShouldBuyActionResponse>;
  date: Date;
}

export const aiAnalysisQuery = (symbol: string) =>
  queryOptions({
    queryKey: ["aiAnalysis", symbol],
    queryFn: (): Promise<AIAnalysisResponse> =>
      fetch(`/api/analysis-ai?symbol=${symbol}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 60 * 24,
  });
