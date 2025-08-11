import { internal } from '@convex/_generated/api';
import { DataModel, Doc } from '@convex/_generated/dataModel';
import { GenericQueryCtx, PaginationOptions, PaginationResult } from 'convex/server';
import { calculateTickerPerformance, TickerPerformance } from './investmentPerformance';

interface ListUserSymbolsHelperProps {
  userId: string;
}

interface GetSymbolOperationsHelperProps {
  userId: string;
  symbol: string;
}

interface PaginateBySymbolHelperProps {
  userId: string;
  paginationOpts: PaginationOptions;
}

interface TickerPerformanceWithSymbol {
  symbol: string;
  performance: TickerPerformance;
}

export async function listUserSymbolsHelper(ctx: GenericQueryCtx<DataModel>, { userId }: ListUserSymbolsHelperProps) {
  const symbols = await ctx.db
    .query('operations')
    .withIndex('by_user', (q) => q.eq('userId', userId))
    .order('asc')
    .collect();

  const symbolNames = symbols.map((operation) => operation.symbol);

  return [...new Set(symbolNames)];
}

export async function getSymbolOperationsHelper(
  ctx: GenericQueryCtx<DataModel>,
  { userId, symbol }: GetSymbolOperationsHelperProps,
) {
  const operations = await ctx.db
    .query('operations')
    .withIndex('by_user_symbol', (q) => q.eq('userId', userId).eq('symbol', symbol))
    .collect();

  return operations;
}

export async function paginateBySymbolHelper(
  ctx: GenericQueryCtx<DataModel>,
  { userId, paginationOpts }: PaginateBySymbolHelperProps,
): Promise<PaginationResult<TickerPerformanceWithSymbol>> {
  const symbols = await ctx.runQuery(internal.queries.operations.listUserSymbols, { userId });
  const startingIndex = paginationOpts.cursor ? symbols.indexOf(paginationOpts.cursor) + 1 : 0;
  const endIndex = paginationOpts.numItems + startingIndex;

  const paginatedSymbols = symbols.slice(startingIndex, endIndex);
  const isDone = endIndex >= symbols.length;
  const nextCursor = isDone ? symbols[symbols.length - 1] : symbols[endIndex - 1];

  const operations: Record<(typeof symbols)[number], Doc<'operations'>[]> = {};

  await Promise.all(
    paginatedSymbols.map(async (symbol) => {
      const symbolOperations = await ctx.runQuery(internal.queries.operations.getSymbolOperations, {
        symbol,
        userId,
      });

      operations[symbol] = symbolOperations;
    }),
  );

  const tickerPerformance = paginatedSymbols.map((symbol) => {
    return {
      symbol,
      performance: calculateTickerPerformance(operations[symbol] || []),
    };
  });

  return {
    isDone,
    continueCursor: nextCursor,
    page: tickerPerformance,
  };
}
