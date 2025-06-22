import { Effect } from 'effect';
import { getCacheClient } from './getCacheClient';

export function getCache<T>(key: string): Effect.Effect<T | null, Error> {
  const client = getCacheClient();

  return Effect.tryPromise({
    try: () => client.get<T>(key),
    catch: (error) =>
      new Error(`Error getting cache: ${error instanceof Error ? error.message : 'Unknown error'}`, { cause: error }),
  });
}
