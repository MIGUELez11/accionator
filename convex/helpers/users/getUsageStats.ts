import { DataModel } from '@convex/_generated/dataModel';
import { GenericQueryCtx } from 'convex/server';
import { DEFAULT_TOKENS, getTokensHelper } from '../tokens';
import { getTokensCostHelper } from '../tokens/cost/getTokensCost';

export async function getUsageStatsHelper(ctx: GenericQueryCtx<DataModel>, userId: string) {
  const tokens = (await getTokensHelper(ctx, { userId })) ?? DEFAULT_TOKENS;
  const tokensCost = await getTokensCostHelper(ctx, ['input', 'output']);

  const cost = tokensCost.input * tokens.usedInputTokens + tokensCost.output * tokens.usedOutputTokens;
  const maxCost = tokensCost.input * tokens.inputTokensLimit + tokensCost.output * tokens.outputTokensLimit;

  return {
    userId,
    tokens,
    cost,
    maxCost,
    usage: cost / maxCost,
  };
}
