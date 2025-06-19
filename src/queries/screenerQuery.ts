import { queryOptions } from "@tanstack/react-query";

export const screenerQuery = (screener: string | null) => queryOptions({
  queryKey: ["screener", screener],
  queryFn: () => fetch(`/api/screener?screener=${screener}`).then(res => res.json()),
  enabled: !!screener,
  staleTime: 60 * 1000
})