import { query } from '@convex/_generated/server';
import { getUserId } from '@convex/helpers/users/getUserId';
import { getUsageStatsHelper } from '../helpers/users/getUsageStats';

export const getUsageStats = query(async (ctx) => {
  const userId = await getUserId(ctx, true);

  return getUsageStatsHelper(ctx, userId);
});
