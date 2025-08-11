import { internalQuery, query } from '@convex/_generated/server';
import {
  getInvestmentPerformanceHelper,
  getInvestmentPerformancePerTickerHelper,
} from '@convex/helpers/operation/investmentPerformance';
import {
  getSymbolOperationsHelper,
  listUserSymbolsHelper,
  paginateBySymbolHelper,
} from '@convex/helpers/operation/paginateBySymbol';
import { paginateHistoryOperationsHelper } from '@convex/helpers/operation/paginateHistory';
import { getUserId } from '@convex/helpers/users/getUserId';
import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';

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

export const listUserSymbols = internalQuery({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId } = args;
    const symbols = await listUserSymbolsHelper(ctx, { userId });
    return symbols;
  },
});

export const getSymbolOperations = internalQuery({
  args: {
    userId: v.string(),
    symbol: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId, symbol } = args;
    const operations = await getSymbolOperationsHelper(ctx, { userId, symbol });
    return operations;
  },
});

export const paginateBySymbol = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { paginationOpts } = args;
    const userId = await getUserId(ctx, true);
    const operations = await paginateBySymbolHelper(ctx, { userId, paginationOpts });
    return operations;
  },
});
