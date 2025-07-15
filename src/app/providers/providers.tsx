'use client';

import { ConvexQueryClient } from '@convex-dev/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { convex, ConvexClientProvider } from './ConvexProvider';
import { ReactScan } from './ReactScan';
import { getQueryClient } from '@/app/getQueryClient';

let queryClientWithConvex: QueryClient | null = null;

function getQueryClientWithConvex() {
  if (queryClientWithConvex) {
    return queryClientWithConvex;
  }

  // Use the same QueryClient instance that was used for server-side prefetching
  const baseQueryClient = getQueryClient();
  
  const convexQueryClient = new ConvexQueryClient(convex);

  // Merge the Convex configuration with the existing QueryClient
  baseQueryClient.setDefaultOptions({
    ...baseQueryClient.getDefaultOptions(),
    queries: {
      ...baseQueryClient.getDefaultOptions().queries,
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  });

  convexQueryClient.connect(baseQueryClient);
  queryClientWithConvex = baseQueryClient;

  return queryClientWithConvex;
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
