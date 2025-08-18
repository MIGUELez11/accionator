import { Effect } from 'effect';
import { AIUnknownModelError } from './AiErrors';
import { AIModels, AIProviders, AIService } from './AIService';
import { GeminiModelServices } from './gemini';
import { withTokens } from './withTokens';

const providerByModel: Record<AIModels, AIProviders> = {
  'gemini-2.0-flash-lite': 'gemini',
  'gemini-2.0-flash': 'gemini',
  'gemini-2.5-pro': 'gemini',
  'gemini-2.5-flash': 'gemini',
};

const ServicePerModel: Record<AIModels, Effect.Effect<AIService['Type']>> = {
  ...GeminiModelServices,
};

export const getAIService = Effect.fn(function* (model: AIModels) {
  const service = yield* ServicePerModel[model];

  if (!service) {
    return yield* Effect.fail(
      new AIUnknownModelError({
        provider: providerByModel[model],
        model,
      }),
    );
  }

  return AIService.of({
    ...service,
    model,
    generateResponse: (prompt) =>
      Effect.provideService(withTokens(service.generateResponse, prompt), AIService, service),
    chat: {
      ...service.chat,
      sendMessage: (message) =>
        Effect.provideService(withTokens(service.chat.sendMessage, message), AIService, service),
    },
  });
});
