import { Effect } from 'effect';
import { updateTokens } from '../convex/tokens/updateTokens';
import { validateTokensAvailable } from '../convex/tokens/validateTokensAvailable';
import { AIService } from './AIService';

type ValidateTokensAvailableErrors = Effect.Effect.Error<ReturnType<typeof validateTokensAvailable>>;
type UpdateTokensErrors = Effect.Effect.Error<ReturnType<typeof updateTokens>>;

export type ThrowableErrors = ValidateTokensAvailableErrors | UpdateTokensErrors;

type Fn = AIService['Type']['generateResponse'] | AIService['Type']['chat']['sendMessage'];

export const withTokens = Effect.fn(function* <TFn extends Fn>(fn: TFn, prompt: string) {
  const aiService = yield* AIService;

  const promptTokens = yield* aiService.countTokens(prompt);
  yield* validateTokensAvailable(promptTokens);

  const callabledFn = fn as (prompt: string) => Effect.Effect<string, ThrowableErrors>;
  const response = yield* callabledFn(prompt);

  const responseTokens = yield* aiService.countTokens(response);
  yield* updateTokens(promptTokens, responseTokens);

  return response;
});
