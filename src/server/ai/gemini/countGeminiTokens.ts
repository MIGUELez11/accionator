import { Effect } from 'effect';
import { GeminiModels } from '.';
import { AIServiceError } from '../AiErrors';
import { getAiClient } from './getAiClient';

export function countGeminiTokens(model: GeminiModels) {
  return Effect.fn(function* (text: string) {
    const ai = yield* getAiClient();

    if (!text.length) {
      return 0;
    }

    const response = yield* Effect.tryPromise({
      try: () =>
        ai.models.countTokens({
          model,
          contents: text,
        }),
      catch: (error) =>
        new AIServiceError({
          message: `Error counting tokens`,
          cause: error,

          provider: 'gemini',
          model,
        }),
    });

    return response.totalTokens ?? 0;
  });
}
