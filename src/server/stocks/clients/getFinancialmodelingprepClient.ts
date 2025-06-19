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
  limit?: number;
  country?: string;
};

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
}

function getParams<T extends Record<string, number | string>>(params: T) {
  return Object.entries(params).reduce<Record<keyof T, string>>(
    (acc, [key, value]) => {
      if (value) {
        acc[key as keyof T] = value.toString();
      }

      return acc;
    },
    {} as Record<keyof T, string>
  );
}

class FinancialModelingPrepClient {
  private url: URL;
  private apiKey: string;

  constructor({ apiKey }: { apiKey: string }) {
    this.url = new URL(`https://financialmodelingprep.com/api/`);
    this.apiKey = apiKey;
  }

  private async fetch<
    P extends Record<string, number | string>,
    R extends Object
  >(endpoint: `v3/${string}`, params: P): Promise<R> {
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
    return this.fetch<ScreeningParams, StockScreenerResponse[]>(
      "v3/stock-screener",
      params
    );
  }
}

export async function getFinancialmodelingprepClient() {
  return new FinancialModelingPrepClient({ apiKey: process.env.FMP_API_KEY! });
}
