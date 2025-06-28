import { defaultShouldDehydrateQuery, isServer, QueryClient, QueryClientConfig } from '@tanstack/react-query';

const STANDARD_OPTIONS: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
    dehydrate: {
      shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending', // include pending queries in dehydration
      shouldRedactErrors: () => false, // don't redact errors from dehydration so nextjs can handle them
    },
  },
};

function makeDefaultOptions(defaultOptions: QueryClientConfig = {}): QueryClientConfig {
  return {
    ...defaultOptions,
    defaultOptions: {
      ...defaultOptions.defaultOptions,
      queries: {
        ...defaultOptions.defaultOptions?.queries,
        staleTime:
          defaultOptions.defaultOptions?.queries?.staleTime ?? STANDARD_OPTIONS.defaultOptions?.queries?.staleTime,
      },
      dehydrate: {
        ...defaultOptions.defaultOptions?.dehydrate,
        shouldDehydrateQuery:
          defaultOptions.defaultOptions?.dehydrate?.shouldDehydrateQuery ??
          STANDARD_OPTIONS.defaultOptions?.dehydrate?.shouldDehydrateQuery,
        shouldRedactErrors:
          defaultOptions.defaultOptions?.dehydrate?.shouldRedactErrors ??
          STANDARD_OPTIONS.defaultOptions?.dehydrate?.shouldRedactErrors,
      },
    },
  };
}

function makeQueryClient(defaultOptions: QueryClientConfig = {}) {
  return new QueryClient(makeDefaultOptions(defaultOptions));
}

let browserClient: QueryClient | null = null;

export function getQueryClient(defaultOptions?: QueryClientConfig) {
  if (isServer) {
    return makeQueryClient(defaultOptions);
  }

  if (!browserClient) {
    browserClient = makeQueryClient(defaultOptions);
  }

  return browserClient;
}
