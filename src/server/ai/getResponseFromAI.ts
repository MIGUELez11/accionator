import { Effect } from 'effect';
import { models, Models } from './models';

export function getResponseFromAI(prompt: string, model: Models = 'gemini'): Effect.Effect<string, Error> {
  return Effect.gen(function* () {
    const modelObject = models[model];

    if (!modelObject) {
      return yield* Effect.fail(new Error(`Model ${model} not found`));
    }

    return yield* modelObject.generate(prompt);
  });
}
