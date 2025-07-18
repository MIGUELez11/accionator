import { withCacheEffect } from '@/server/cache/withCache';
import { Effect } from 'effect';
import { Screeners } from '../../types';
import { ScreenerService } from './service';

export const getScreening = Effect.fn(function* (screener: Screeners) {
  const screenerService = yield* ScreenerService;

  return (
    yield *
    withCacheEffect(
      `screener:${screenerService.screenerName}:${screener}`,
      30 * 60 * 1000,
      screenerService.getScreening(screener),
    )
  );
});
