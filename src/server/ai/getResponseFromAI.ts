import { Effect } from 'effect';
import { updateTokens } from '../convex/tokens/updateTokens';
import { validateTokensAvailable } from '../convex/tokens/validateTokensAvailable';
import { countTokens } from './countTokens';
import { models, Models } from './models';

export function getResponseFromAI(prompt: string, model: Models = 'gemini'): Effect.Effect<string, Error> {
  return Effect.gen(function* () {
    const modelObject = models[model];

    if (!modelObject) {
      return yield* Effect.fail(new Error(`Model ${model} not found`));
    }

    const promptTokens = yield * countTokens(prompt);
    yield * validateTokensAvailable(promptTokens);

    const response = yield * modelObject.generate(prompt);
    const responseTokens = yield * countTokens(response);

    yield * updateTokens(promptTokens, responseTokens);

    return response;
  });
}
