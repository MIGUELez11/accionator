import { query } from '@convex/_generated/server';
import { Infer, v } from 'convex/values';

import { getRemainingTokensHelper } from '@convex/helpers/tokens';
import { getTokensHelper } from '@convex/helpers/tokens/getTokens';

/* Param validation objects */
const getTokensParams = v.object({
  userId: v.string(),
});

const getRemainingTokensParams = v.object({
  userId: v.string(),
});

/* Types */
export type GetTokensParams = Infer<typeof getTokensParams>;
export type GetRemainingTokensParams = Infer<typeof getRemainingTokensParams>;

/* Queries */
export const getTokens = query({
  args: getTokensParams,
  handler: async (ctx, args) => {
    return getTokensHelper(ctx, { userId: args.userId });
  },
});

export const getRemainingTokens = query({
  args: getRemainingTokensParams,
  handler: async (ctx, args) => {
    return getRemainingTokensHelper(ctx, { userId: args.userId });
  },
});
