import { Effect } from 'effect';
import { AIService } from '../AIService';
import { GeminiChat, GeminiChatLayer } from './chat/GeminiChatLayer';
import { countGeminiTokens } from './countGeminiTokens';
import { getResponseFromGemini } from './getResponseFromGemini';

export const GeminiAIService = Effect.fn(function* (model: GeminiModels) {
  const geminiChat = yield* GeminiChat;

  return AIService.of({
    countTokens: countGeminiTokens(model),
    generateResponse: getResponseFromGemini(model),
    chat: {
      initialize: Effect.fn(function* () {
        yield* geminiChat.createChat(model);
      }),
      sendMessage: geminiChat.sendMessage,
      getHistory: geminiChat.getHistory,
    },
  });
});

export type GeminiModels = 'gemini-2.0-flash-lite' | 'gemini-2.0-flash' | 'gemini-2.5-pro' | 'gemini-2.5-flash';

export const GeminiModelServices: Record<GeminiModels, Effect.Effect<AIService['Type']>> = {
  'gemini-2.0-flash-lite': GeminiAIService('gemini-2.0-flash-lite').pipe(Effect.provide(GeminiChatLayer)),
  'gemini-2.0-flash': GeminiAIService('gemini-2.0-flash').pipe(Effect.provide(GeminiChatLayer)),
  'gemini-2.5-pro': GeminiAIService('gemini-2.5-pro').pipe(Effect.provide(GeminiChatLayer)),
  'gemini-2.5-flash': GeminiAIService('gemini-2.5-flash').pipe(Effect.provide(GeminiChatLayer)),
};
