import { DataModel } from '@convex/_generated/dataModel';
import { GenericMutationCtx } from 'convex/server';
import { getTokensHelper } from './getTokens';

export interface UseTokensHelperParams {
  userId: string;
  inputTokens: number;
  outputTokens: number;
}

export async function useTokensHelper(
  ctx: GenericMutationCtx<DataModel>,
  { userId, inputTokens, outputTokens }: UseTokensHelperParams,
) {
  const tokens = await getTokensHelper(ctx, { userId });

  if (!tokens) {
    return false;
  }

  await ctx.db.patch(tokens._id, {
    usedInputTokens: tokens.usedInputTokens + inputTokens,
    usedOutputTokens: tokens.usedOutputTokens + outputTokens,
  });

  return true;
}
