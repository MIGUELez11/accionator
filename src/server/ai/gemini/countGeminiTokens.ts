import { Effect } from 'effect';
import { DEFAULT_MODEL, getAiClient } from './getAiClient';

export function countGeminiTokens(text: string): Effect.Effect<number, Error> {
  return Effect.gen(function* () {
    const ai = yield* getAiClient();

    if (!text.length) {
      return 0;
    }

    const response =
      yield *
      Effect.tryPromise({
        try: () =>
          ai.models.countTokens({
            model: DEFAULT_MODEL,
            contents: text,
          }),
        catch: (error) =>
          new Error(`Error counting tokens: ${error instanceof Error ? error.message : 'Unknown error'}`, {
            cause: error,
          }),
      });

    return response.totalTokens ?? 0;
  });
}
