import { Screeners } from '@/server/types';
import { Context, Effect } from 'effect';
import { StockScreenerResponse } from '../clients/getFinancialmodelingprepClient';

export class ScreenerService extends Context.Tag('ScreenerService')<
  ScreenerService,
  {
    readonly screenerName: string;
    readonly getScreening: (screener: Screeners) => Effect.Effect<StockScreenerResponse[], Error>;
  }
>() {}
