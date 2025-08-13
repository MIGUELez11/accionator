import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { ConvexClientProvider } from './ConvexProvider';
import { LocalizationProvider } from './LocalizationProvider';
import { ReactQueryProvider } from './ReactQueryProvider';
import { ReactScan } from './ReactScan';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LocalizationProvider>
      <ConvexClientProvider>
        <ReactQueryProvider>
          <ReactScan />
          {children}
          <ReactQueryDevtools />
        </ReactQueryProvider>
      </ConvexClientProvider>
    </LocalizationProvider>
  );
}
