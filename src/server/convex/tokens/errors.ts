import { Data } from 'effect';

export class InsufficientTokensError extends Data.TaggedError('InsufficientTokensError')<{
  readonly message: 'Not enough tokens available';

  readonly tokensAvailable: number;
  readonly tokensRequired: number;
}> {
  constructor(props: { tokensAvailable: number; tokensRequired: number }) {
    super({
      message: 'Not enough tokens available',
      tokensAvailable: props.tokensAvailable,
      tokensRequired: props.tokensRequired,
    });
  }
}
