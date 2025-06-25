import { mutation } from '@convex/_generated/server';
import { getTokensHelper, saveDefaultTokensHelper } from '@convex/helpers/tokens';
import { Infer, v } from 'convex/values';

/* Param validation objects */
const setDefaultTokensParams = v.object({
  userId: v.string(),
});

const useTokensParams = v.object({
  userId: v.string(),
  inputTokens: v.number(),
  outputTokens: v.number(),
});

/* Types */
export type SetDefaultTokensParams = Infer<typeof setDefaultTokensParams>;
export type UseTokensParams = Infer<typeof useTokensParams>;

/* Mutations */
export const setDefaultTokens = mutation({
  args: setDefaultTokensParams,
  handler: async (ctx, args) => {
    const tokens = await getTokensHelper(ctx, { userId: args.userId });

    if (tokens) {
      return false;
    }

    await saveDefaultTokensHelper(ctx, { userId: args.userId });

    return true;
  },
});

export const useTokens = mutation({
  args: useTokensParams,
  handler: async (ctx, args) => {
    const tokens = await getTokensHelper(ctx, { userId: args.userId });

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
