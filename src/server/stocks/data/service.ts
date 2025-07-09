import { Context, Effect } from 'effect';
import { ActionRecommendations, BasicFinancials, CompanyNews, StockPrice, StockProfile } from '../../types';

export class StocksService extends Context.Tag('StocksService')<
  StocksService,
  {
    name: string;

    getStockProfile: (symbol: string) => Effect.Effect<StockProfile, Error>;
    getStockPrice: (symbol: string) => Effect.Effect<StockPrice, Error>;
    getActionRecommendations: (symbol: string) => Effect.Effect<ActionRecommendations, Error>;
    getBasicFinancials: (symbol: string) => Effect.Effect<BasicFinancials, Error>;
    getCompanyNews: (symbol: string) => Effect.Effect<CompanyNews, Error>;
  }
>() {}
