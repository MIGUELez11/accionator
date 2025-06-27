import { api } from '@convex/_generated/api';
import { ConvexError } from 'convex/values';
import { Effect } from 'effect';
import { getConvexClient } from '../client/getConvexClient';

export function validateTokensAvailable(promptTokens: number): Effect.Effect<void, Error> {
  return Effect.gen(function* () {
    const convexClient = yield* getConvexClient();

    yield *
      Effect.tryPromise({
        try: () => convexClient.mutation(api.mutations.tokens.renewTokens),
        catch: (error) => {
          if (error instanceof ConvexError) {
            return new Error(`Failed trying to renew tokens: ${error.data}`, { cause: error });
          }

          return new Error('Failed to get tokens', { cause: error });
        },
      });

    const tokens = yield* Effect.tryPromise({
      try: () => convexClient.query(api.queries.tokens.getRemainingTokens),
      catch: (error) => {
        if (error instanceof ConvexError) {
          return new Error(`Failed to get remaining tokens: ${error.data}`, { cause: error });
        }

        return new Error('Failed to get remaining tokens', { cause: error });
      },
    });

    if (tokens.inputTokens < promptTokens) {
      return yield* Effect.fail(new Error('Not enough tokens available'));
    }
  });
}
