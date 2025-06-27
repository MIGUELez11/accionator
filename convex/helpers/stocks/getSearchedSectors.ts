import { DataModel } from '@convex/_generated/dataModel';
import { GenericQueryCtx } from 'convex/server';

interface GetSearchedSectorsHelperParams {
  userId: string;
  since?: number;
}

export async function getSearchedSectorsHelper(
  ctx: GenericQueryCtx<DataModel>,
  { userId, since }: GetSearchedSectorsHelperParams,
) {
  const sectors = await ctx.db
    .query('sectorsSearched')
    .withIndex('by_user_last_searched', (q) => {
      if (since) {
        return q.eq('userId', userId).gte('lastSearched', since);
      }

      return q.eq('userId', userId);
    })
    .collect();

  return sectors.map((sector) => ({
    sector: sector.sector,
    count: sector.count,
    lastSearched: sector.lastSearched,
  }));
}
