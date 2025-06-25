'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { getQueryClient } from '../getQueryClient';
import { ConvexClientProvider } from './ConvexProvider';
import { ReactScan } from './ReactScan';

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

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
