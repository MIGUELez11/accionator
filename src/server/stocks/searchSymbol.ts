import { withCache } from '../cache/withCache';
import {
  getFinancialmodelingprepClient,
  SymbolSearchParams,
  SymbolSearchResponse,
} from './clients/getFinancialmodelingprepClient';

const mockSymbols = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currency: 'USD',
    stockExchange: 'NASDAQ',
    exchangeShortName: 'NASDAQ',
  },
  {
    symbol: 'GOOG',
    name: 'Alphabet Inc.',
    currency: 'USD',
    stockExchange: 'NASDAQ',
    exchangeShortName: 'NASDAQ',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    currency: 'USD',
    stockExchange: 'NASDAQ',
    exchangeShortName: 'NASDAQ',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    currency: 'USD',
    stockExchange: 'NASDAQ',
    exchangeShortName: 'NASDAQ',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    currency: 'USD',
    stockExchange: 'NASDAQ',
    exchangeShortName: 'NASDAQ',
  },
] satisfies SymbolSearchResponse[];

function removeDuplicates(symbols: SymbolSearchResponse[]): SymbolSearchResponse[] {
  const symbolsMap: Record<SymbolSearchResponse['symbol'], SymbolSearchResponse> = {};

  return symbols.filter((symbol) => {
    const found = !!symbolsMap[symbol.symbol];
    if (!found) {
      symbolsMap[symbol.symbol] = symbol;
    }

    return !found;
  });
}

export async function searchSymbol(query: Omit<SymbolSearchParams, 'limit'>) {
  return withCache(`searchSymbol:${query.query}:${query.exchange}`, 60 * 60 * 24, async () => {
    const client = await getFinancialmodelingprepClient();

    if (!query.query) {
      return mockSymbols;
    }

    const response = await client.symbolSearch({ ...query, limit: 10 });

    return removeDuplicates(response);
  });
}
