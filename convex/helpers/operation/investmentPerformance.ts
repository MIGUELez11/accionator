import { DataModel, Doc } from '@convex/_generated/dataModel';
import { GenericQueryCtx } from 'convex/server';

interface GetInvestmentPerformanceHelperProps {
  userId: string;
}

type OperationBySymbol = Record<Doc<'operations'>['symbol'], Doc<'operations'>[]>;

export interface TickerPerformance {
  symbol: Doc<'operations'>['symbol'];
  buyedQuantity: number;
  soldQuantity: number;

  totalInvestment: number;
  relativeProfit: number;
  relativeProfitPercentage: number;

  holdingQuantity: number;
  holdingPrice: number;

  profit: number;
  profitPercentage: number;
}

/**
 * Performance metrics for the investment portfolio
 */
export interface InvestmentPerformance {
  /** Total amount invested across all operations */
  totalInvestment: number;
  /** Profit/loss from completed operations (sold shares) */
  relativeProfit: number;
  /** Percentage profit/loss from completed operations */
  relativeProfitPercentage: number;

  /** Current investment value in portfolio (unsold shares) */
  holdingInvestment: number;

  /** Total profit/loss including both sold and unsold positions */
  profit: number;
  /** Total profit/loss percentage */
  profitPercentage: number;
}

export function calculateTickerPerformance(operations: Doc<'operations'>[]): TickerPerformance {
  const buyOperations = operations.filter((operation) => operation.type === 'buy');
  const sellOperations = operations.filter((operation) => operation.type === 'sell');

  let buyedQuantity: number = 0;
  let totalInvestment: number = 0;

  let soldQuantity: number = 0;
  let totalSoldPrice: number = 0;

  buyOperations.forEach((operation) => {
    buyedQuantity += operation.quantity;
    totalInvestment += operation.quantity * operation.price;
  });

  sellOperations.forEach((operation) => {
    soldQuantity += operation.quantity;
    totalSoldPrice += operation.quantity * operation.price;
  });

  const averageBuyPrice = buyedQuantity > 0 ? totalInvestment / buyedQuantity : 0;
  const averageSellPrice = soldQuantity > 0 ? totalSoldPrice / soldQuantity : 0;

  const relativeProfit = soldQuantity * averageSellPrice - soldQuantity * averageBuyPrice; // We only take into account the sold quantity to calculate the profit. The rest is still in the portfolio.
  const holdingQuantity = buyedQuantity - soldQuantity;

  const holdingInvestment = holdingQuantity * averageBuyPrice;
  const profit = totalSoldPrice + holdingInvestment - totalInvestment;

  if (!operations.length) {
    throw new Error('No operations found');
  }

  return {
    symbol: operations[0].symbol,
    buyedQuantity,
    soldQuantity,

    totalInvestment,
    relativeProfit: relativeProfit,
    relativeProfitPercentage:
      soldQuantity * averageBuyPrice > 0 ? relativeProfit / (soldQuantity * averageBuyPrice) : 0,

    holdingQuantity,
    holdingPrice: averageBuyPrice,

    profit,
    profitPercentage: totalInvestment > 0 ? profit / totalInvestment : 0,
  };
}

export async function getInvestmentPerformancePerTickerHelper(
  ctx: GenericQueryCtx<DataModel>,
  { userId }: GetInvestmentPerformanceHelperProps,
) {
  const operations = await ctx.db
    .query('operations')
    .withIndex('by_user', (q) => q.eq('userId', userId))
    .collect();

  const operationsBySymbol: OperationBySymbol = operations.reduce((acc, operation) => {
    const symbol = operation.symbol;

    acc[symbol] = [...(acc[symbol] || []), operation];

    return acc;
  }, {} as OperationBySymbol);

  const tickerPerformances: TickerPerformance[] = Object.values(operationsBySymbol).map(calculateTickerPerformance);

  return tickerPerformances;
}

export async function getInvestmentPerformanceHelper(
  ctx: GenericQueryCtx<DataModel>,
  { userId }: GetInvestmentPerformanceHelperProps,
): Promise<InvestmentPerformance> {
  const tickerPerformances = await getInvestmentPerformancePerTickerHelper(ctx, { userId });

  // Aggregate values across all tickers
  let totalInvestment = 0;
  let relativeProfit = 0;
  let holdingInvestment = 0;
  let profit = 0;

  tickerPerformances.forEach((ticker) => {
    totalInvestment += ticker.totalInvestment;
    relativeProfit += ticker.relativeProfit;
    holdingInvestment += ticker.holdingQuantity * ticker.holdingPrice;
    profit += ticker.profit;
  });

  // Calculate weighted percentages based on investment size
  let relativeProfitPercentage = 0;
  let profitPercentage = 0;

  tickerPerformances.forEach((ticker) => {
    if (ticker.totalInvestment === 0) {
      return;
    }

    const weight = ticker.totalInvestment / totalInvestment;

    relativeProfitPercentage += ticker.relativeProfitPercentage * weight;
    profitPercentage += ticker.profitPercentage * weight;
  });

  return {
    totalInvestment,
    relativeProfit,
    relativeProfitPercentage,
    holdingInvestment,
    profit,
    profitPercentage,
  };
}
