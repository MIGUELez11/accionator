import { Effect } from 'effect';
import { getCache } from './getCache';
import { setCache } from './setCache';

function withCachePromise<T>(key: string, ttl: number = 60 * 60 * 24, fn: () => Promise<T>): Effect.Effect<T, Error> {
  return Effect.gen(function* () {
    const cached = yield* getCache<T>(key);

    if (cached) {
      return cached;
    }

    const result = yield* Effect.tryPromise({
      try: () => fn(),
      catch: (error) =>
        new Error(error instanceof Error ? error.message : 'Unknown error', {
          cause: error,
        }),
    });

    yield* setCache(key, result, ttl);

    return result;
  });
}

export function withCacheEffect<TResponse, TError, TContext>(
  key: string,
  ttl: number = 60 * 60 * 24,
  fn: Effect.Effect<TResponse, TError, TContext>,
) {
  return Effect.gen(function* () {
    const cached = yield* getCache<TResponse>(key);
    if (cached) {
      return cached;
    }

    const result = yield* fn;
    yield* setCache(key, result, ttl);
    return result;
  });
}

export function withCache<T>(key: string, ttl: number = 60 * 60 * 24, fn: () => Promise<T>): Promise<T> {
  return Effect.runPromise(withCachePromise(key, ttl, fn));
}
