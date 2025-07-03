import { Data } from 'effect';

export class TradingViewFetchError extends Data.TaggedError('TradingViewFetchError')<{
  readonly message: string;
  readonly cause?: unknown;
}> {}
