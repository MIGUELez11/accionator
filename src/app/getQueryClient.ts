import { ConvexQueryClient } from '@convex-dev/react-query';
import { defaultShouldDehydrateQuery, isServer, QueryClient } from '@tanstack/react-query';
import { convex } from './providers/ConvexProvider';

function makeQueryClient() {
  const convexQueryClient = new ConvexQueryClient(convex);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
      dehydrate: {
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  });

  convexQueryClient.connect(queryClient);

  return queryClient;
}

let browserClient: QueryClient | null = null;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserClient) {
    browserClient = makeQueryClient();
  }

  return browserClient;
}
