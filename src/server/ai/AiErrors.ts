import { Data } from 'effect';
import { AIModels, AIProviders } from './AIService';

export class ApiKeyMissingError extends Data.TaggedError('ApiKeyMissingError')<{
  readonly message: 'API key is missing';

  readonly provider: AIProviders;
}> {
  constructor(props: { provider: AIProviders }) {
    super({
      message: 'API key is missing',
      provider: props.provider,
    });
  }
}

export class NotEnoughTokensError extends Data.TaggedError('NotEnoughTokensError')<{
  readonly message: 'Not enough tokens';

  readonly provider: AIProviders;
  readonly model: AIModels;

  readonly tokensAvailable: number;
  readonly tokensRequired: number;
}> {
  constructor(props: { provider: AIProviders; model: AIModels; tokensAvailable: number; tokensRequired: number }) {
    super({
      message: 'Not enough tokens',
      provider: props.provider,
      model: props.model,
      tokensAvailable: props.tokensAvailable,
      tokensRequired: props.tokensRequired,
    });
  }
}

export class AIServiceError extends Data.TaggedError('AIServiceError')<{
  readonly message: string;
  readonly cause?: unknown;

  readonly provider: AIProviders;
  readonly model: string;
}> {}

export class AIUnknownModelError extends Data.TaggedError('AIUnknownModelError')<{
  readonly message: 'Unknown model';

  readonly provider: AIProviders;
  readonly model: string;
}> {
  constructor(props: { provider: AIProviders; model: string }) {
    super({
      message: 'Unknown model',
      provider: props.provider,
      model: props.model,
    });
  }
}
