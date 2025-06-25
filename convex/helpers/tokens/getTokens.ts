import { DataModel } from '@convex/_generated/dataModel';
import { GenericQueryCtx } from 'convex/server';

export interface GetTokensHelperParams {
  userId: string;
}

export async function getTokensHelper(ctx: GenericQueryCtx<DataModel>, { userId }: GetTokensHelperParams) {
  return await ctx.db
    .query('tokens')
    .withIndex('by_user', (q) => q.eq('userId', userId))
    .first();
}
