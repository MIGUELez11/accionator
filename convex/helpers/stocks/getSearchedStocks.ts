import { DataModel } from '@convex/_generated/dataModel';
import { GenericQueryCtx } from 'convex/server';

interface GetSearchedStocksHelperParams {
  userId: string;
  since?: number;
}

export async function getSearchedStocksHelper(
  ctx: GenericQueryCtx<DataModel>,
  { userId, since }: GetSearchedStocksHelperParams,
) {
  const stocks = await ctx.db
    .query('stocksSearched')
    .withIndex('by_user_last_searched', (q) => {
      if (since) {
        return q.eq('userId', userId).gte('lastSearched', since);
      }

      return q.eq('userId', userId);
    })
    .collect();

  return stocks.map((stock) => ({
    stock: stock.stock,
    count: stock.count,
    lastSearched: stock.lastSearched,
  }));
}
