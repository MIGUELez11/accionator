import { Effect } from 'effect';
import { models, Models } from './models';

export function countTokens(prompt: string, model: Models = 'gemini'): Effect.Effect<number, Error> {
  return Effect.gen(function* () {
    const modelObject = models[model];

    if (!modelObject) {
      return yield* Effect.fail(new Error(`Model ${model} not found`));
    }

    return yield* modelObject.countTokens(prompt);
  });
}
