import { Effect } from 'effect';
import { GeminiModels } from '.';
import { AIServiceError } from '../AiErrors';
import { getAiClient } from './getAiClient';

export function getResponseFromGemini(model: GeminiModels) {
  return Effect.fn(function* (prompt: string) {
    const ai = yield* getAiClient();

    if (!prompt.length) {
      return (
        yield *
        Effect.fail(
          new AIServiceError({
            message: 'Prompt is empty',

            model,
            provider: 'gemini',
          }),
        )
      );
    }

    const response =
      yield *
      Effect.tryPromise({
        try: () =>
          ai.models.generateContent({
            model,
            contents: prompt,
          }),
        catch: (error) =>
          new AIServiceError({
            message: `Error getting response from Gemini`,
            cause: error,

            model,
            provider: 'gemini',
          }),
      });

    return response.text ?? '';
  });
}
