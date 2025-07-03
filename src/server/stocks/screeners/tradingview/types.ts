type FilterParams = 'close' | 'market_cap_basic' | 'beta_1_year' | 'volume' | 'RSI' | 'is_primary' | 'is_blacklisted';
type FilterOperation = 'egreater' | 'greater' | 'equal' | 'in_range';
type FilterRight = number | boolean | number[];

export type Symbols = {
  symbolset: ('SYML:SP;SPX' | 'SYML:NASDAQ;NDX')[];
};

export type Columns =
  | 'name'
  | 'description'
  | 'logoid'
  | 'update_mode'
  | 'type'
  | 'typespecs'
  | 'Recommend.All'
  | 'Recommend.MA'
  | 'Recommend.Other'
  | 'recommendation_mark'
  | 'beta_1_year'
  | 'RSI'
  | 'Mom'
  | 'pricescale'
  | 'minmov'
  | 'fractional'
  | 'minmove2'
  | 'AO'
  | 'CCI20'
  | 'Stoch.K'
  | 'Stoch.D'
  | 'Candle.3BlackCrows'
  | 'Candle.3WhiteSoldiers'
  | 'Candle.AbandonedBaby.Bearish'
  | 'Candle.AbandonedBaby.Bullish'
  | 'Candle.Doji'
  | 'Candle.Doji.Dragonfly'
  | 'Candle.Doji.Gravestone'
  | 'Candle.Engulfing.Bearish'
  | 'Candle.Engulfing.Bullish'
  | 'Candle.EveningStar'
  | 'Candle.Hammer'
  | 'Candle.HangingMan'
  | 'Candle.Harami.Bearish'
  | 'Candle.Harami.Bullish'
  | 'Candle.InvertedHammer'
  | 'Candle.Kicking.Bearish'
  | 'Candle.Kicking.Bullish'
  | 'Candle.LongShadow.Lower'
  | 'Candle.LongShadow.Upper'
  | 'Candle.Marubozu.Black'
  | 'Candle.Marubozu.White'
  | 'Candle.MorningStar'
  | 'Candle.ShootingStar'
  | 'Candle.SpinningTop.Black'
  | 'Candle.SpinningTop.White'
  | 'Candle.TriStar.Bearish'
  | 'Candle.TriStar.Bullish'
  | 'exchange'
  | 'close'
  | 'market_cap_basic'
  | 'volume'
  | 'sector'
  | 'country'
  | 'dps_common_stock_prim_issue_fy';

export type Filter = {
  left: FilterParams;
  operation: FilterOperation;
  right: FilterRight;
};

export type TradingViewScreenerFetchResponse = {
  data: {
    [key: string]: {
      s: string;
      d: (string | number)[];
    };
  };
};
