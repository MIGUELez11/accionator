import { ScreenerService } from '../service';
import { getTradingViewScreening } from './getScreening';

export const TradingViewScreener = ScreenerService.of({
  screenerName: 'TradingView',
  getScreening: getTradingViewScreening,
});
