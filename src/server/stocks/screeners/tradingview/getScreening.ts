import { Screeners } from '@/server/types';
import { Effect } from 'effect';
import { StockScreenerResponse } from '../../clients/getFinancialmodelingprepClient';
import { fetchTradingViewScreener } from './fetch';
import { formatScreeningData, mapToScreeningData } from './format';
import { Columns, Filter } from './types';

export const columns = [
  'name',
  'description',
  'close',
  'market_cap_basic',
  'volume',
  'beta_1_year',
  'sector',
  'country',
  'dps_common_stock_prim_issue_fy',
  'Recommend.All',
  'Recommend.MA',
  'Recommend.Other',
  'recommendation_mark',
] as const satisfies Columns[];

export const columnsMap = {
  name: 'symbol',
  description: 'companyName',
  close: 'price',
  market_cap_basic: 'marketCap',
  volume: 'volume',
  beta_1_year: 'beta',
  sector: 'sector',
  country: 'country',
  dps_common_stock_prim_issue_fy: 'lastAnnualDividend',
  'Recommend.All': 'techRating',
  'Recommend.MA': 'movingAverageRating',
  'Recommend.Other': 'oscillatorsRating',
  recommendation_mark: 'analystsRating',
} as const satisfies Record<(typeof columns)[number], keyof StockScreenerResponse>;

const screenersCommonFilters = [
  {
    left: 'volume',
    operation: 'greater',
    right: 1e6,
  },
  {
    left: 'RSI',
    operation: 'greater',
    right: 60,
  },
] satisfies Filter[];

const screeners = {
  highVolatilityWithGrow: [
    ...screenersCommonFilters,
    {
      left: 'beta_1_year',
      operation: 'greater',
      right: 1,
    },
    {
      left: 'close',
      operation: 'greater',
      right: 10,
    },
    {
      left: 'market_cap_basic',
      operation: 'greater',
      right: 300e6,
    },
  ],
  pennyStocksHighVolume: [
    ...screenersCommonFilters,
    {
      left: 'close',
      operation: 'in_range',
      right: [1, 5],
    },
  ],
  pennyHighBeta: [
    ...screenersCommonFilters,
    {
      left: 'beta_1_year',
      operation: 'greater',
      right: 1.5,
    },
    {
      left: 'close',
      operation: 'in_range',
      right: [1, 5],
    },
  ],
  nasdaq100: [
    ...screenersCommonFilters,
    {
      left: 'is_blacklisted',
      operation: 'equal',
      right: false,
    },
  ],
} satisfies Record<Screeners, Filter[]>;

export const getTradingViewScreening = Effect.fn(function* (screener: Screeners) {
  const filters = screeners[screener];
  const data = yield* fetchTradingViewScreener({
    columns,
    filter: filters,
    symbols: screener === 'nasdaq100' ? { symbolset: ['SYML:NASDAQ;NDX'] } : undefined,
  });

  const formattedData = formatScreeningData(columns, data);

  return formattedData.map(mapToScreeningData);
});
