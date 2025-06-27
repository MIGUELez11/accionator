import { DataModel } from '@convex/_generated/dataModel';
import { GenericMutationCtx } from 'convex/server';

export interface SaveHistoricalUsageHelperParams {
  userId: string;
  cost: number;
  inputTokens: number;
  outputTokens: number;
  renewDate: number;
}

export async function saveHistoricalUsageHelper(
  ctx: GenericMutationCtx<DataModel>,
  { userId, cost, inputTokens, outputTokens, renewDate }: SaveHistoricalUsageHelperParams,
) {
  const today = Date.now();
  const month = new Date(today).getMonth() + 1;
  const year = new Date(today).getFullYear();

  const monthUsage = await ctx.db
    .query('historicalUsage')
    .withIndex('by_user_date', (q) => q.eq('userId', userId).gte('date', today))
    .order('desc')
    .first();

  if (monthUsage) {
    await ctx.db.patch(monthUsage._id, {
      cost: monthUsage.cost + cost,
      inputTokens: monthUsage.inputTokens + inputTokens,
      outputTokens: monthUsage.outputTokens + outputTokens,
    });
  } else {
    await ctx.db.insert('historicalUsage', {
      userId,
      cost,
      inputTokens,
      outputTokens,
      month,
      year,
      date: renewDate,
    });
  }
}
