import { Effect } from 'effect';
import { getCacheClient } from './getCacheClient';

export function removeCache(key: string): Effect.Effect<number, Error> {
  const client = getCacheClient();

  return Effect.tryPromise({
    try: () => client.del(key),
    catch: (error) =>
      new Error(`Error removing cache: ${error instanceof Error ? error.message : 'Unknown error'}`, { cause: error }),
  });
}
