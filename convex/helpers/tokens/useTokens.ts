import { DataModel } from '@convex/_generated/dataModel';
import { GenericMutationCtx } from 'convex/server';
import { getTokensCostHelper } from './cost/getTokensCost';
import { getTokensHelper } from './getTokens';
import { saveHistoricalUsageHelper } from './historical/saveHistoricalUsage';

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

  const cost = await getTokensCostHelper(ctx, ['input', 'output']);

  await saveHistoricalUsageHelper(ctx, {
    userId,
    cost: cost.input * inputTokens + cost.output * outputTokens,
    inputTokens,
    outputTokens,
    renewDate: tokens.subscriptionRenewDate!,
  });

  await ctx.db.patch(tokens._id, {
    usedInputTokens: tokens.usedInputTokens + inputTokens,
    usedOutputTokens: tokens.usedOutputTokens + outputTokens,
  });

  return true;
}
