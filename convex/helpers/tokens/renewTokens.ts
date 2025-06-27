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

function getRenewDate(
  previousRenewDate: Doc<'tokens'>['subscriptionRenewDate'] | undefined,
  subscriptionType: Doc<'tokens'>['subscriptionType'],
) {
  if (subscriptionType === 'monthly') {
    if (previousRenewDate) {
      const renewDate = new Date();

      renewDate.setDate(new Date(previousRenewDate).getDate());
      renewDate.setMonth(renewDate.getMonth() + 1);

      return renewDate.getTime();
    } else {
      const renewDate = new Date();

      renewDate.setMonth(renewDate.getMonth() + 1);
      return renewDate.getTime();
    }
  }

  return null;
}

function shouldRenewTokens(tokens: Doc<'tokens'> | null) {
  if (!tokens) {
    return true;
  }

  if (tokens.subscriptionType === 'lifetime') {
    return false;
  }

  if (!tokens.subscriptionRenewDate || new Date(tokens.subscriptionRenewDate).getDate() < new Date().getDate()) {
    return true;
  }

  return false;
}

export async function renewTokensHelper(ctx: GenericMutationCtx<DataModel>, { userId }: RenewTokensHelperParams) {
  const tokens = await getTokensHelper(ctx, { userId });

  if (!shouldRenewTokens(tokens)) {
    return false;
  }

  const usedSubscriptionType = tokens?.subscriptionType ?? DEFAULT_TOKENS.subscriptionType;

  const data = {
    ...DEFAULT_TOKENS,
    userId,
    subscriptionRenewDate: getRenewDate(tokens?.subscriptionRenewDate, usedSubscriptionType),
    subscriptionType: usedSubscriptionType,
  };

  if (tokens) {
    await ctx.db.patch(tokens._id, data);
  } else {
    await ctx.db.insert('tokens', data);
  }

  return true;
}
