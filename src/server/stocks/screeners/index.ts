import { withCache } from '@/server/cache/withCache';
import { Effect } from 'effect';
import { Screeners } from '../../types';
import { ScreenerService } from './service';

export const getScreening = Effect.fn(function* (screener: Screeners) {
  const screenerService = yield* ScreenerService;

  return withCache(`screener:${screenerService.screenerName}:${screener}`, 30 * 60 * 1000, () =>
    Effect.runPromise(screenerService.getScreening(screener)),
  );
});
