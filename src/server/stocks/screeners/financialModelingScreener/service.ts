import { ScreenerService } from '../service';
import { getFinancialModelingScreening } from './getScreening';

export const FinancialModelingScreener = ScreenerService.of({
  screenerName: 'FinancialModelingPrep',
  getScreening: getFinancialModelingScreening,
});
