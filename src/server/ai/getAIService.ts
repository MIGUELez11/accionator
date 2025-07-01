import { Effect } from 'effect';
import { AIUnknownModelError } from './AiErrors';
import { AIModels, AIService } from './AIService';
import { GeminiAIService } from './gemini';
import { withTokens } from './withTokens';

const ServicePerModel: Record<AIModels, AIService['Type']> = {
  'gemini-2.0-flash-lite': GeminiAIService,
};

export function getAIService(model: AIModels): Effect.Effect<AIService['Type'], AIUnknownModelError> {
  const service = ServicePerModel[model];

  if (!service) {
    return Effect.fail(
      new AIUnknownModelError({
        provider: 'gemini',
        model,
      }),
    );
  }

  return Effect.succeed(
    AIService.of({
      ...service,
      generateResponse: (prompt) => Effect.provideService(withTokens(prompt), AIService, service),
    }),
  );
}
