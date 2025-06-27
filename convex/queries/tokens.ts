import { query } from '@convex/_generated/server';

import { getRemainingTokensHelper } from '@convex/helpers/tokens';
import { getTokensHelper } from '@convex/helpers/tokens/getTokens';
import { getUserId } from '@convex/helpers/users/getUserId';

/* Param validation objects */

/* Types */

/* Queries */
export const getTokens = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx, true);

    return getTokensHelper(ctx, { userId });
  },
});

export const getRemainingTokens = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx, true);

    return getRemainingTokensHelper(ctx, { userId });
  },
});
