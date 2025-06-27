import { DataModel } from '@convex/_generated/dataModel';
import { GenericQueryCtx } from 'convex/server';
import { getSearchedSectorsHelper } from '../stocks/getSearchedSectors';
import { getSearchedStocksHelper } from '../stocks/getSearchedStocks';
import { DEFAULT_TOKENS, getTokensHelper } from '../tokens';
import { getTokensCostHelper } from '../tokens/cost/getTokensCost';

function getSince(renewDate: number | null, months: number) {
  if (!renewDate) {
    return undefined;
  }

  const date = new Date(renewDate);
  date.setMonth(date.getMonth() - months);
  return date.getTime();
}

export async function getUsageStatsHelper(ctx: GenericQueryCtx<DataModel>, userId: string) {
  const tokens = await getTokensHelper(ctx, { userId }).then((tokens) => tokens ?? DEFAULT_TOKENS);

  const promises = [
    getTokensCostHelper(ctx, ['input', 'output']),
    getSearchedStocksHelper(ctx, { userId }),
    getSearchedSectorsHelper(ctx, { userId }),
  ] as const;

  const [tokensCost, stocksSearched, sectorsSearched] = await Promise.all(promises);

  const cost = tokensCost.input * tokens.usedInputTokens + tokensCost.output * tokens.usedOutputTokens;
  const maxCost = tokensCost.input * tokens.inputTokensLimit + tokensCost.output * tokens.outputTokensLimit;

  return {
    userId,
    tokens,
    cost,
    maxCost,
    usage: cost / maxCost,

    stocksSearchedCount: stocksSearched.reduce((acc, stock) => acc + stock.count, 0),
    sectorsSearched,
  };
}
