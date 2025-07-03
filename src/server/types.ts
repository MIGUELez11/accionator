import {
  CompanyProfile2,
  RecommendationTrend,
  type BasicFinancials as FinnhubBasicFinancials,
  type CompanyNews as FinnhubCompanyNews,
} from 'finnhub-ts';
import { ScreeningParams } from './stocks/clients/getFinancialmodelingprepClient';

/* === Screeners === */

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
} as const satisfies Record<string, ScreeningParams>;

export type Screeners = keyof typeof screeners;
export interface StockPrice {
  price?: number;
  change?: number;
  percentChange?: number;
  openPrice?: number;
  high?: number;
  low?: number;
  previousClose?: number;
}

/* === Stock operations === */
export type ActionRecommendations = RecommendationTrend[];
export type BasicFinancials = FinnhubBasicFinancials;
export type CompanyNews = FinnhubCompanyNews[];
export type StockProfile = CompanyProfile2;

export interface StockInfo {
  stockProfile: StockProfile;
  price: StockPrice;
  recommendations: ActionRecommendations;
  news: CompanyNews;
}

/* === AI Analysis === */
interface SummaryResponse<
  parseAsObject = false,
  R extends parseAsObject extends false ? string : object = parseAsObject extends false ? string : object,
> {
  response: R;
  inputTokens: number;
  outputTokens: number;
}

interface ShouldBuyActionResponse {
  action: 'buy' | 'doNotBuy';
  entryPrice: {
    min: number;
    max: number;
  };
  desiredPrice: number;
  exitStrategies: Record<number, number>;
  stopLoss: number;
  analysis: string;
  estimatedTime: string;
  profit: number;
  loss: number;
}

export interface AIAnalysisResponse {
  newsSummary: SummaryResponse;
  financialAnalysis: SummaryResponse;
  action: SummaryResponse<true, ShouldBuyActionResponse>;
  date: Date;
}