import {
  CompanyProfile2,
  RecommendationTrend,
  type BasicFinancials as FinnhubBasicFinancials,
  type CompanyNews as FinnhubCompanyNews,
} from 'finnhub-ts';

/* === Screeners === */
export type Screeners = 'highVolatilityWithGrow' | 'pennyStocksHighVolume' | 'pennyHighBeta' | 'nasdaq100';
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

export interface InvestmentPlanResponse extends Omit<SummaryResponse<true>, 'response'> {
  response: {
    investmentSuggestions: Array<{
      symbol: string;
      entryPriceMin: number;
      entryPriceMax: number;
      quantityToInvest: number;
      stopLossPrice: number;
      estimatedProfitPercentage: number;
      estimatedLossPercentage: number;
      profitProbability: number; // A value between 0 and 1
      lossProbability: number; // A value between 0 and 1
      exitStrategy: Array<{ price: number; percentage: number }>;
      stockAnalysisSummary: string;
      estimatedTime: string;
    }>;
    overallStrategyReasoning: string;
    expectedProfit: number;
    expectedLoss: number;
    timeframe: string;
    createdAt: Date;
  };
}
