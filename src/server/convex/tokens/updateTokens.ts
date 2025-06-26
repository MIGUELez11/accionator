import { api } from '@convex/_generated/api';
import { ConvexError } from 'convex/values';
import { Effect } from 'effect';
import { getConvexClient } from '../client/getConvexClient';

export function updateTokens(promptTokens: number, responseTokens: number): Effect.Effect<void, Error> {
  return Effect.gen(function* () {
    const convexClient = yield* getConvexClient();

    yield* Effect.tryPromise({
      try: () =>
        convexClient.mutation(api.mutations.tokens.useTokens, {
          inputTokens: promptTokens,
          outputTokens: responseTokens,
        }),
      catch: (error) => {
        if (error instanceof ConvexError) {
          return new Error(`Failed to update tokens: ${error.data}`, { cause: error });
        }

        return new Error('Failed to update tokens', { cause: error });
      },
    });
  });
}
