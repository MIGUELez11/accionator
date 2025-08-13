'use client';

import { ConvexQueryClient } from '@convex-dev/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { convex } from './ConvexProvider';

let queryClientWithConvex: QueryClient | null = null;

function getQueryClientWithConvex() {
  if (queryClientWithConvex) {
    return queryClientWithConvex;
  }

  const convexQueryClient = new ConvexQueryClient(convex);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  });

  convexQueryClient.connect(queryClient);
  queryClientWithConvex = queryClient;

  return queryClient;
}

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClientWithConvex();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
