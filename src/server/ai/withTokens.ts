import { Effect } from 'effect';
import { updateTokens } from '../convex/tokens/updateTokens';
import { validateTokensAvailable } from '../convex/tokens/validateTokensAvailable';
import { AIService } from './AIService';

type ValidateTokensAvailableErrors = Effect.Effect.Error<ReturnType<typeof validateTokensAvailable>>;
type UpdateTokensErrors = Effect.Effect.Error<ReturnType<typeof updateTokens>>;

export type ThrowableErrors = ValidateTokensAvailableErrors | UpdateTokensErrors;

export function withTokens(prompt: string) {
  return Effect.gen(function* () {
    const aiService = yield* AIService;

    const promptTokens = yield* aiService.countTokens(prompt);
    yield* validateTokensAvailable(promptTokens);

    const response = yield* aiService.generateResponse(prompt);

    const responseTokens = yield* aiService.countTokens(response);
    yield* updateTokens(promptTokens, responseTokens);

    return response;
  });
}
