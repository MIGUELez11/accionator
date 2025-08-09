import { query } from '@convex/_generated/server';
import {
  getInvestmentPerformanceHelper,
  getInvestmentPerformancePerTickerHelper,
} from '@convex/helpers/operation/investmentPerformance';
import { paginateHistoryOperationsHelper } from '@convex/helpers/operation/paginateHistory';
import { getUserId } from '@convex/helpers/users/getUserId';
import { paginationOptsValidator } from 'convex/server';

export const listOperations = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { paginationOpts } = args;

    const userId = await getUserId(ctx, true);
    const operations = await paginateHistoryOperationsHelper(ctx, { userId, paginationOpts });

    return operations;
  },
});

export const getInvestmentPerformancePerTicker = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx, true);
    const tickerPerformances = await getInvestmentPerformancePerTickerHelper(ctx, { userId });
    return tickerPerformances;
  },
});

export const getInvestmentPerformance = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx, true);
    const tickerPerformances = await getInvestmentPerformanceHelper(ctx, { userId });

    return tickerPerformances;
  },
});
