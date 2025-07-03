import { Rating, StockScreenerResponse } from '../../clients/getFinancialmodelingprepClient';
import { columnsMap } from './getScreening';
import { Columns, TradingViewScreenerFetchResponse } from './types';

function getAnalystRating(value: number): NonNullable<Rating> {
  if (isNaN(value) || value == null) {
    return 'Hold';
  }

  if (value >= 2.75 && value <= 3) {
    return 'Strong Sell';
  } else if (value >= 2.25 && value < 2.75) {
    return 'Sell';
  } else if (value >= 1.75 && value < 2.25) {
    return 'Hold';
  } else if (value >= 1.25 && value < 1.75) {
    return 'Buy';
  } else if (value >= 1 && value < 1.25) {
    return 'Strong Buy';
  }

  return 'Hold';
}

function getOtherRating(value: number): NonNullable<Rating> {
  if (isNaN(value) || value == null) {
    return 'Hold';
  }

  if (value >= 0.5 && value <= 1) {
    return 'Strong Buy';
  } else if (value >= 0.1 && value < 0.5) {
    return 'Buy';
  } else if (value >= -0.1 && value < 0.1) {
    return 'Hold';
  } else if (value >= -0.5 && value < -0.1) {
    return 'Sell';
  } else if (value >= -1 && value < -0.5) {
    return 'Strong Sell';
  }

  return 'Hold';
}

export function formatScreeningData<TColumns extends Columns>(
  columns: TColumns[],
  { data }: TradingViewScreenerFetchResponse,
) {
  return Object.values(data).map((stock) => {
    return columns.reduce(
      (acc, column, i) => {
        if (column === 'recommendation_mark') {
          acc[column] = getAnalystRating(stock.d[i] as number);
        } else if (column === 'Recommend.All' || column === 'Recommend.MA' || column === 'Recommend.Other') {
          acc[column] = getOtherRating(stock.d[i] as number);
        } else {
          acc[column] = stock.d[i] as string | number | boolean;
        }

        return acc;
      },
      {} as Record<TColumns, string | number | boolean>,
    );
  });
}

export function mapToScreeningData<TColumns extends keyof typeof columnsMap>(
  data: Record<TColumns, string | number | boolean>,
) {
  return Object.entries(data).reduce<StockScreenerResponse>((acc, [key, value]) => {
    const mappedKey = columnsMap[key as TColumns];

    if (!mappedKey) {
      return acc;
    }

    acc[mappedKey] = value as StockScreenerResponse[typeof mappedKey];
    return acc;
  }, {} as StockScreenerResponse);
}
