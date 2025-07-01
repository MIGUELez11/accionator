import { api } from '@convex/_generated/api';
import { ConvexError } from 'convex/values';
import { Effect } from 'effect';
import { getConvexClient } from '../client/getConvexClient';
import { ConvexServiceError, ConvexUnknownError } from '../errors';
import { InsufficientTokensError } from './errors';

export function validateTokensAvailable(promptTokens: number) {
  return Effect.gen(function* () {
    const convexClient = yield* getConvexClient();

    yield* Effect.tryPromise({
      try: () => convexClient.mutation(api.mutations.tokens.renewTokens),
      catch: (error) => {
        if (error instanceof ConvexError) {
          return new ConvexServiceError({
            message: `Failed trying to renew tokens: ${error.data}`,
            cause: error,
          });
        }

        return new ConvexUnknownError({
          message: 'Failed to get tokens',
          cause: error,
        });
      },
    });

    const tokens = yield* Effect.tryPromise({
      try: () => convexClient.query(api.queries.tokens.getRemainingTokens),
      catch: (error) => {
        if (error instanceof ConvexError) {
          return new ConvexServiceError({
            message: `Failed to get remaining tokens: ${error.data}`,
            cause: error,
          });
        }

        return new ConvexUnknownError({
          message: 'Failed to get remaining tokens',
          cause: error,
        });
      },
    });

    if (tokens.inputTokens < promptTokens) {
      return yield* Effect.fail(
        new InsufficientTokensError({
          tokensAvailable: tokens.inputTokens,
          tokensRequired: promptTokens,
        }),
      );
    }

    return yield* Effect.void;
  });
}
