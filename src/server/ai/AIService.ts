import { Context, Effect } from 'effect';
import { AIServiceError, ApiKeyMissingError, NotEnoughTokensError } from './AiErrors';
import { GeminiModels } from './gemini';
import { ThrowableErrors } from './withTokens';

export type AIProviders = 'gemini';
export type AIModels = GeminiModels;

export class AIService extends Context.Tag('AIService')<
  AIService,
  {
    readonly model?: AIModels;

    readonly countTokens: (text: string) => Effect.Effect<number, AIServiceError | ApiKeyMissingError>;
    readonly generateResponse: (
      prompt: string,
    ) => Effect.Effect<string, AIServiceError | ApiKeyMissingError | NotEnoughTokensError | ThrowableErrors>;
  }
>() {}
