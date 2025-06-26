import { auth } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { Effect } from 'effect';

let convex: ConvexHttpClient | null = null;

export function getConvexClient(): Effect.Effect<ConvexHttpClient, Error> {
  return Effect.gen(function* () {
    if (!convex) {
      convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    }

    const user = yield* Effect.tryPromise({
      try: () => auth(),
      catch: (error) => new Error('Failed to get user', { cause: error }),
    });
    const token = yield* Effect.tryPromise({
      try: () => user.getToken({ template: 'convex' }),
      catch: (error) => new Error('Failed to get token', { cause: error }),
    });

    if (token) {
      convex.setAuth(token);
    }

    return convex;
  });
}
