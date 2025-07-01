import { Effect } from 'effect';
import { AIServiceError } from '../AiErrors';
import { DEFAULT_MODEL, getAiClient } from './getAiClient';

export function getResponseFromGemini(prompt: string) {
  return Effect.gen(function* () {
    const ai = yield* getAiClient();

    if (!prompt.length) {
      return yield* Effect.fail(
        new AIServiceError({
          message: 'Prompt is empty',

          model: DEFAULT_MODEL,
          provider: 'gemini',
        }),
      );
    }

    const response = yield* Effect.tryPromise({
      try: () =>
        ai.models.generateContent({
          model: DEFAULT_MODEL,
          contents: prompt,
        }),
      catch: (error) =>
        new AIServiceError({
          message: `Error getting response from Gemini`,
          cause: error,

          model: DEFAULT_MODEL,
          provider: 'gemini',
        }),
    });

    return response.text ?? '';
  });
}
