import { DataModel } from '@convex/_generated/dataModel';
import { GenericMutationCtx } from 'convex/server';

export interface SaveDefaultTokensHelperParams {
  userId: string;
}

export const DEFAULT_TOKENS = {
  inputTokensLimit: 3e6, // 0.3$
  outputTokensLimit: 1e6 / 2, // 0.2$
  usedInputTokens: 0,
  usedOutputTokens: 0,
};

export function saveDefaultTokensHelper(ctx: GenericMutationCtx<DataModel>, { userId }: SaveDefaultTokensHelperParams) {
  return ctx.db.insert('tokens', {
    ...DEFAULT_TOKENS,
    userId,
  });
}
