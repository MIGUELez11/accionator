import { StockScreenerResponse } from '@/server/stocks/clients/getFinancialmodelingprepClient';
import { AIAnalysisResponse, CompanyNews, Screeners, StockInfo } from '@/server/types';

// This is the type to ensure API_ROUTES object is used when calling the fetch function
export type API_ROUTES = (typeof API_ROUTES)[keyof typeof API_ROUTES];

// 1. this is the type of the query parameters that will be used by the fetch function
export type API_ROUTES_QUERY = {
  stockInfo: {
    symbol: string;
  };
  stockNews: {
    symbol: string;
  };
  aiAnalysis: {
    symbol: string;
  };
  screener: {
    screener: Screeners;
  };
};

// 2. This are the routes that will be used in the client
export const API_ROUTES = {
  stockInfo: 'stockInfo',
  stockNews: 'stockNews',
  aiAnalysis: 'aiAnalysis',
  screener: 'screener',
} as const satisfies Record<keyof API_ROUTES_QUERY, keyof typeof API_ROUTES_URLS>;

// 3. This are the urls that will be used by the fetch function
export const API_ROUTES_URLS = {
  stockInfo: '/api/stocks',
  stockNews: '/api/stocks/news',
  aiAnalysis: '/api/analysis-ai',
  screener: '/api/screener',
} as const satisfies Record<keyof API_ROUTES_QUERY, string>;

// 4. This are the types of the responses from the api
export type API_ROUTES_RESPONSE = {
  stockInfo: StockInfo;
  stockNews: CompanyNews;
  aiAnalysis: AIAnalysisResponse;
  screener: StockScreenerResponse[];
};
