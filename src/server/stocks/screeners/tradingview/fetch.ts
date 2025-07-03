import { Effect } from 'effect';
import { defaultFilter2 } from './defaultFilter2';
import { TradingViewFetchError } from './errors';
import { Columns, Filter, Symbols, TradingViewScreenerFetchResponse } from './types';

const URL = 'https://scanner.tradingview.com/america/scan?label-product=screener-stock';

export const fetchTradingViewScreener = Effect.fn(function* ({
  columns,
  filter,
  symbols,
}: {
  columns: Columns[];
  filter: Filter[];
  symbols?: Symbols;
}) {
  const response =
    yield *
    Effect.tryPromise({
      try: () =>
        fetch(URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'Content-Type': 'text/plain;charset=UTF-8',
          },
          referrer: 'https://www.tradingview.com/',
          body: JSON.stringify({
            columns,
            filter,
            symbols,
            markets: ['america'],
            range: [0, 100],
            sort: {
              sortBy: 'beta_1_year',
              sortOrder: 'desc',
            },
            options: {
              lang: 'en',
            },
            filter2: defaultFilter2,
          }),
        }),
      catch: (error) => {
        return new TradingViewFetchError({
          message: 'Failed to fetch trading view screener',
          cause: error,
        });
      },
    });

  const data = yield* Effect.tryPromise({
    try: () => response.json(),
    catch: (error) => {
      return new TradingViewFetchError({
        message: 'Failed to parse trading view screener',
        cause: error,
      });
    },
  });

  return data as TradingViewScreenerFetchResponse;
});
