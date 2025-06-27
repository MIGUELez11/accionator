import { DataModel } from '@convex/_generated/dataModel';
import { GenericQueryCtx } from 'convex/server';

interface GetHistoricalUsageHelperParams {
  userId: string;
  since?: number;
  limit?: number;
}

export interface HistoricalUsage {
  date: number;
  month: number;
  year: number;
  cost: number;
  inputTokens: number;
  outputTokens: number;
}

export async function getHistoricalUsageHelper(
  ctx: GenericQueryCtx<DataModel>,
  { userId, since, limit }: GetHistoricalUsageHelperParams,
): Promise<HistoricalUsage[]> {
  const query = ctx.db
    .query('historicalUsage')
    .withIndex('by_user_date', (q) => q.eq('userId', userId).gte('date', since ?? 0));

  const result = await (limit ? query.take(limit) : query.collect());

  return result.map((item) => ({
    date: item.date,
    month: item.month,
    year: item.year,
    cost: item.cost,
    inputTokens: item.inputTokens,
    outputTokens: item.outputTokens,
  }));
}
