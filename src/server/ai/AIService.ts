import { Content } from '@google/genai';
import { Context, Effect } from 'effect';
import { AIChatNotFoundError, AIServiceError, ApiKeyMissingError } from './AiErrors';
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
    ) => Effect.Effect<string, AIServiceError | ApiKeyMissingError | ThrowableErrors>;
    chat: {
      readonly initialize: () => Effect.Effect<void, AIServiceError | ApiKeyMissingError | ThrowableErrors>;
      readonly sendMessage: (
        message: string,
      ) => Effect.Effect<string, AIServiceError | ApiKeyMissingError | ThrowableErrors | AIChatNotFoundError>;
      readonly getHistory: () => Effect.Effect<Content[], AIServiceError | ApiKeyMissingError | AIChatNotFoundError>;
    };
  }
>() {}
