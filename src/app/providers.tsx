'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useEffect } from 'react';
import { scan } from 'react-scan';
import { getQueryClient } from './getQueryClient';

function ReactScan() {
  useEffect(() => {
    scan({
      enabled: true,
    });
  }, []);

  return <></>;
}

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactScan />

      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
