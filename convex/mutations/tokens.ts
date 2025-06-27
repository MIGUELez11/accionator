import { mutation } from '@convex/_generated/server';
import { renewTokensHelper } from '@convex/helpers/tokens';
import { useTokensHelper } from '@convex/helpers/tokens/useTokens';
import { getUserId } from '@convex/helpers/users/getUserId';
import { Infer, v } from 'convex/values';

/* Param validation objects */

const useTokensParams = v.object({
  inputTokens: v.number(),
  outputTokens: v.number(),
});

/* Types */
export type UseTokensParams = Infer<typeof useTokensParams>;

/* Mutations */
export const renewTokens = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx, true);

    return await renewTokensHelper(ctx, { userId });
  },
});

export const useTokens = mutation({
  args: useTokensParams,
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx, true);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTokensHelper(ctx, {
      userId,
      inputTokens: args.inputTokens,
      outputTokens: args.outputTokens,
    });
  },
});
