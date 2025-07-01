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

const ServicePerModel: Record<AIModels, AIService['Type']> = {
  ...GeminiModelServices,
};

export function getAIService(model: AIModels): Effect.Effect<AIService['Type'], AIUnknownModelError> {
  const service = ServicePerModel[model];

  if (!service) {
    return Effect.fail(
      new AIUnknownModelError({
        provider: providerByModel[model],
        model,
      }),
    );
  }

  return Effect.succeed(
    AIService.of({
      ...service,
      model,
      generateResponse: (prompt) => Effect.provideService(withTokens(prompt), AIService, service),
    }),
  );
}
