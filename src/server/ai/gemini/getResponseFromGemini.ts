import { Effect } from 'effect';
import { DEFAULT_MODEL, getAiClient } from './getAiClient';

export function getResponseFromGemini(prompt: string): Effect.Effect<string, Error> {
  return Effect.gen(function* () {
    const ai = yield* getAiClient();

    if (!prompt.length) {
      return yield* Effect.fail(new Error('Prompt is empty'));
    }

    const response = yield* Effect.tryPromise({
      try: () =>
        ai.models.generateContent({
          model: DEFAULT_MODEL,
          contents: prompt,
        }),
      catch: (error) =>
        new Error(`Error getting response from Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`, {
          cause: error,
        }),
    });

    return response.text ?? '';
  });
}
