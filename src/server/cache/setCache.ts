import { Effect } from 'effect';
import { getCacheClient } from './getCacheClient';

export function setCache<T>(key: string, value: T, ttl: number = 60 * 60 * 24): Effect.Effect<T | 'OK' | null, Error> {
  const client = getCacheClient();

  return Effect.tryPromise({
    try: () => client.set(key, value, { ex: ttl }),
    catch: (error) =>
      new Error(`Error setting cache: ${error instanceof Error ? error.message : 'Unknown error'}`, { cause: error }),
  });
}
