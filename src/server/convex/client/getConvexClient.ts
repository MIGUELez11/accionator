import { auth } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { Effect } from 'effect';
import { ConvexUnknownError, EnvironmentVariableError } from '../errors';

export function getConvexClient() {
  return Effect.gen(function* () {
    if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
      return yield* Effect.fail(
        new EnvironmentVariableError({
          message: 'NEXT_PUBLIC_CONVEX_URL is not set',
        }),
      );
    }

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    const user = yield* Effect.tryPromise({
      try: () => auth(),
      catch: (error) => new ConvexUnknownError({ message: 'Failed to get user', cause: error }),
    });

    const token = yield* Effect.tryPromise({
      try: () => user.getToken({ template: 'convex' }),
      catch: (error) => new ConvexUnknownError({ message: 'Failed to get token', cause: error }),
    });

    if (token) {
      convex.setAuth(token);
    }

    return convex;
  });
}
