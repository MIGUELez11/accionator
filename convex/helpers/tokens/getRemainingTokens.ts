import { DataModel } from '@convex/_generated/dataModel';
import { GenericQueryCtx } from 'convex/server';
import { getTokensHelper } from './getTokens';

export interface GetRemainingTokensHelperParams {
  userId: string;
}

export async function getRemainingTokensHelper(
  ctx: GenericQueryCtx<DataModel>,
  { userId }: GetRemainingTokensHelperParams,
) {
  const tokens = await getTokensHelper(ctx, { userId });

  if (!tokens) {
    return {
      inputTokens: 0,
      outputTokens: 0,
    };
  }

  return {
    inputTokens: tokens.inputTokensLimit - tokens.usedInputTokens,
    outputTokens: tokens.outputTokensLimit - tokens.usedOutputTokens,
  };
}
