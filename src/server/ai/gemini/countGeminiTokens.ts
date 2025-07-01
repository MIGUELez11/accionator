import { Effect } from 'effect';
import { AIServiceError } from '../AiErrors';
import { DEFAULT_MODEL, getAiClient } from './getAiClient';

export function countGeminiTokens(text: string) {
  return Effect.gen(function* () {
    const ai = yield* getAiClient();

    if (!text.length) {
      return 0;
    }

    const response = yield* Effect.tryPromise({
      try: () =>
        ai.models.countTokens({
          model: DEFAULT_MODEL,
          contents: text,
        }),
      catch: (error) =>
        new AIServiceError({
          message: `Error counting tokens`,
          cause: error,

          provider: 'gemini',
          model: DEFAULT_MODEL,
        }),
    });

    return response.totalTokens ?? 0;
  });
}
