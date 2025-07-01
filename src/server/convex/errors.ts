import { Data } from 'effect';

export class ConvexServiceError extends Data.TaggedError('ConvexServiceError')<{
  readonly message: string;
  readonly cause?: unknown;
}> {}

export class ConvexUnknownError extends Data.TaggedError('ConvexUnknownError')<{
  readonly message: string;
  readonly cause?: unknown;
}> {}

export class EnvironmentVariableError extends Data.TaggedError('EnvironmentVariableError')<{
  readonly message: string;
  readonly cause?: unknown;
}> {}
