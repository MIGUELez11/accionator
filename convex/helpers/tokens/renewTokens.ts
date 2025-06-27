import { DataModel, Doc } from '@convex/_generated/dataModel';
import { GenericMutationCtx } from 'convex/server';
import { getTokensHelper } from './getTokens';

export interface RenewTokensHelperParams {
  userId: string;
}

export const DEFAULT_TOKENS = {
  inputTokensLimit: 3e6, // 0.3$
  outputTokensLimit: 1e6 / 2, // 0.2$
  usedInputTokens: 0,
  usedOutputTokens: 0,
  subscriptionType: 'lifetime' as const,
  subscriptionRenewDate: null,
};

/**
 * Calculate the next renew date based on the previous renew date.
 */
function getRenewDate() {
  const renewDate = new Date();
  renewDate.setMonth(renewDate.getMonth() + 1);

  renewDate.setDate(1);
  renewDate.setHours(0, 0, 0, -1);

  return renewDate.getTime();
}

/**
 * Determine if tokens should be renewed.
 */
function shouldRenewTokens(tokens: Doc<'tokens'> | null) {
  if (!tokens) {
    return true;
  }
  return !tokens.subscriptionRenewDate || new Date(tokens.subscriptionRenewDate).getTime() < Date.now();
}

/**
 * Renew tokens for a user, saving historical usage if needed and updating or inserting the tokens document.
 */
export async function renewTokensHelper(ctx: GenericMutationCtx<DataModel>, { userId }: RenewTokensHelperParams) {
  const tokens = await getTokensHelper(ctx, { userId });

  // If tokens do not need renewal, exit early
  if (!shouldRenewTokens(tokens)) {
    return false;
  }

  const usedSubscriptionType = tokens?.subscriptionType ?? DEFAULT_TOKENS.subscriptionType;

  // Prepare the data for patch/insert
  const data = {
    ...(usedSubscriptionType === 'lifetime' && tokens ? ({} as Doc<'tokens'>) : DEFAULT_TOKENS),
    userId,
    subscriptionRenewDate: getRenewDate(),
    subscriptionType: usedSubscriptionType,
  };

  if (tokens) {
    await ctx.db.patch(tokens._id, data);
  } else {
    await ctx.db.insert('tokens', data);
  }

  return true;
}
