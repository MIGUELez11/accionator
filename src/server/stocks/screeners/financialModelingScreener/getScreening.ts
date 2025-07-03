import { Effect } from 'effect';
import { Screeners } from '../../../types';
import { getFinancialmodelingprepClient, ScreeningParams } from '../../clients/getFinancialmodelingprepClient';

const SCREENING_LIMIT = 100;
const SCREENER_COMMON_PARAMS = {
  volumeMoreThan: 1e6,
  isEtf: false,
  isFund: false,
  isActivelyTrading: true,
  country: 'US',
  limit: SCREENING_LIMIT,
} as const satisfies ScreeningParams;

export const screeners = {
  // 1. **Acciones con Volatilidad Reciente (para estrategias de impulso o reversión)**
  //    Busca acciones que están mostrando grandes swings, pero con un mínimo de liquidez.
  highVolatilityWithGrow: {
    ...SCREENER_COMMON_PARAMS,
    betaMoreThan: 1,
    priceMoreThan: 10,
    marketCapMoreThan: 300e6, // 300M
  },

  // 2. Penny stocks (cheap stocks)
  pennyStocksHighVolume: {
    ...SCREENER_COMMON_PARAMS,
    priceMoreThan: 1,
    priceLowerThan: 5,
  },

  pennyHighBeta: {
    ...SCREENER_COMMON_PARAMS,
    betaMoreThan: 1.5,
    priceMoreThan: 1,
    priceLowerThan: 5,
  },

  nasdaq100: {
    ...SCREENER_COMMON_PARAMS,
    exchange: 'NASDAQ',
    volumeMoreThan: 1e6,
    priceMoreThan: 5,
    limit: 100,
  },
} as const satisfies Record<Screeners, ScreeningParams>;

export const getFinancialModelingScreening = Effect.fn(function* (screener: Screeners) {
  const client = yield* Effect.tryPromise(getFinancialmodelingprepClient);
  return yield* Effect.tryPromise(() => client.stockScreener(screeners[screener]));
});
