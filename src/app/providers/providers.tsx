'use client';

import { ConvexQueryClient } from '@convex-dev/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { convex, ConvexClientProvider } from './ConvexProvider';
import { ReactScan } from './ReactScan';

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

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClientWithConvex();

  return (
    <ConvexClientProvider>
      <QueryClientProvider client={queryClient}>
        <ReactScan />
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ConvexClientProvider>
  );
}
