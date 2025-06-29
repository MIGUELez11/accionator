import { api } from '@convex/_generated/api';
import { SaveSearchedStock } from '@convex/mutations/stocks';
import { ConvexError } from 'convex/values';
import { Effect } from 'effect';
import { getConvexClient } from '../client/getConvexClient';

export function saveSearchStock(stockData: SaveSearchedStock) {
  return Effect.gen(function* () {
    const convex = yield* getConvexClient();

    const result = yield* Effect.tryPromise({
      try: () => convex.mutation(api.mutations.stocks.saveSearchedStock, stockData),
      catch: (error) => {
        if (error instanceof ConvexError) {
          return new Error(`Failed to save stock search: ${error.data}`, { cause: error });
        }

        return new Error('Failed to save stock search', { cause: error });
      },
    });

    return result;
  });
}
