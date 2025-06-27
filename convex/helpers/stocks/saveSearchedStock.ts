import { DataModel, Doc } from '@convex/_generated/dataModel';
import { GenericMutationCtx } from 'convex/server';
import { getUserId } from '../users/getUserId';

interface SaveSearchedStockHelperParams {
  stock: Doc<'stocksSearched'>['stock'];
  sector: Doc<'sectorsSearched'>['sector'];
}

export async function saveSearchedStockHelper(
  ctx: GenericMutationCtx<DataModel>,
  { stock, sector }: SaveSearchedStockHelperParams,
) {
  const userId = await getUserId(ctx, true);

  const stockSearch = await ctx.db
    .query('stocksSearched')
    .withIndex('by_user_stock', (q) => q.eq('userId', userId).eq('stock', stock))
    .unique();
  const sectorSearch = await ctx.db
    .query('sectorsSearched')
    .withIndex('by_user_sector', (q) => q.eq('userId', userId).eq('sector', sector))
    .unique();

  if (stockSearch) {
    await ctx.db.patch(stockSearch._id, { count: stockSearch.count + 1, lastSearched: Date.now() });
  } else {
    await ctx.db.insert('stocksSearched', { userId, stock, count: 1, lastSearched: Date.now() });
  }

  if (sectorSearch) {
    await ctx.db.patch(sectorSearch._id, { count: sectorSearch.count + 1, lastSearched: Date.now() });
  } else {
    await ctx.db.insert('sectorsSearched', { userId, sector, count: 1, lastSearched: Date.now() });
  }

  return true;
}
