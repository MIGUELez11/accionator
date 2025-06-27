import { DataModel } from '@convex/_generated/dataModel';
import { GenericQueryCtx } from 'convex/server';

export type TokensCostTypes = 'input' | 'output';

export async function getTokensCostHelper<T extends TokensCostTypes>(ctx: GenericQueryCtx<DataModel>, types: T[]) {
  const costs = await Promise.all(
    types.map((type) =>
      ctx.db
        .query('tokensCost')
        .withIndex('by_type', (q) => q.eq('type', type))
        .first(),
    ),
  );

  return costs.reduce(
    (acc, cost) => {
      if (!cost) {
        return acc;
      }
      acc[cost.type as T] = cost.cost / cost.perTokenCount;
      return acc;
    },
    {} as Record<T, number>,
  );
}
