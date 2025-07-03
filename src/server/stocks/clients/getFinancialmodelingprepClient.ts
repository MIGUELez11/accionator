export type ScreeningParams = {
  marketCapMoreThan?: number;
  marketCapLowerThan?: number;
  priceMoreThan?: number;
  priceLowerThan?: number;
  betaMoreThan?: number;
  betaLowerThan?: number;
  volumeMoreThan?: number;
  volumeLowerThan?: number;
  dividendMoreThan?: number;
  dividendLowerThan?: number;
  isEtf?: boolean;
  isFund?: boolean;
  isActivelyTrading?: boolean;
  sector?: string;
  industry?: string;
  exchange?: string;
  limit?: number;
  country?: string;
};

export type Rating = 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';

export interface StockScreenerResponse {
  beta: number;
  companyName: string;
  country: string;
  exchange: string;
  exchangeShortName: string;
  industry: string;
  isActivelyTrading: boolean;
  isEtf: boolean;
  isFund: boolean;
  lastAnnualDividend: number;
  marketCap: number;
  price: number;
  sector: string;
  symbol: string;
  volume: number;

  techRating?: Rating;
  movingAverageRating?: Rating;
  oscillatorsRating?: Rating;
  analystsRating?: Rating;
}

export type SymbolSearchParams = {
  query: string;
  limit: number;
  exchange?: string;
};

export interface SymbolSearchResponse {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

function getParams<T extends Record<string, number | string | boolean>>(params: T) {
  return Object.entries(params).reduce<Record<keyof T, string>>(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key as keyof T] = value.toString();
      }

      return acc;
    },
    {} as Record<keyof T, string>,
  );
}

class FinancialModelingPrepClient {
  private url: URL;
  private apiKey: string;

  constructor({ apiKey }: { apiKey: string }) {
    this.url = new URL(`https://financialmodelingprep.com/api/`);
    this.apiKey = apiKey;
  }

  private async fetch<P extends Record<string, number | string | boolean>, R extends object>(
    endpoint: `v3/${string}`,
    params: P,
  ): Promise<R> {
    const searchUrl = new URL(this.url.toString() + endpoint);
    const searchParams = new URLSearchParams({
      ...getParams(params),
      apikey: this.apiKey,
    });
    searchUrl.search = searchParams.toString();

    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }

    return response.json();
  }

  async stockScreener(params: ScreeningParams) {
    return this.fetch<ScreeningParams, StockScreenerResponse[]>('v3/stock-screener', params);
  }

  async symbolSearch(params: SymbolSearchParams) {
    return this.fetch<SymbolSearchParams, SymbolSearchResponse[]>('v3/search', params);
  }
}

export async function getFinancialmodelingprepClient() {
  return new FinancialModelingPrepClient({ apiKey: process.env.FMP_API_KEY! });
}
