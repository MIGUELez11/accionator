import { mutation } from '@convex/_generated/server';
import { getTokensHelper, saveDefaultTokensHelper } from '@convex/helpers/tokens';
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
export const setDefaultTokens = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx, true);
    const tokens = await getTokensHelper(ctx, { userId });

    if (tokens) {
      return false;
    }

    await saveDefaultTokensHelper(ctx, { userId });

    return true;
  },
});

export const useTokens = mutation({
  args: useTokensParams,
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx, true);
    const tokens = await getTokensHelper(ctx, { userId });

    if (!tokens) {
      return false;
    }

    await ctx.db.patch(tokens._id, {
      usedInputTokens: tokens.usedInputTokens + args.inputTokens,
      usedOutputTokens: tokens.usedOutputTokens + args.outputTokens,
    });

    return true;
  },
});
