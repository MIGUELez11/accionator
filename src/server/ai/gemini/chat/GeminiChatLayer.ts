import { Chat, Content } from '@google/genai';
import { Context, Effect, Layer, Ref } from 'effect';
import { GeminiModels } from '..';
import { AIChatNotFoundError, AIServiceError, ApiKeyMissingError } from '../../AiErrors';
import { createChat } from './createChat';
import { getHistory } from './getHistory';
import { sendMessage } from './sendMessage';

export class GeminiChat extends Context.Tag('GeminiChat')<
  GeminiChat,
  {
    readonly createChat: (model: GeminiModels) => Effect.Effect<Chat, AIServiceError | ApiKeyMissingError>;
    readonly getChat: () => Effect.Effect<Chat, AIChatNotFoundError>;

    readonly sendMessage: (message: string) => Effect.Effect<string, AIServiceError | AIChatNotFoundError>;
    readonly getHistory: () => Effect.Effect<Content[], AIServiceError | AIChatNotFoundError>;
  }
>() {}

export const GeminiChatLayer = Layer.effect(
  GeminiChat,
  Effect.gen(function* () {
    const chatRef = yield* Ref.make<Chat | null>(null);
    const modelRef = yield* Ref.make<GeminiModels>('gemini-2.0-flash-lite');

    const getChat = Effect.fn(function* () {
      const chat = yield* Ref.get(chatRef);

      if (!chat) {
        return yield* Effect.fail(
          new AIChatNotFoundError({
            provider: 'gemini',
          }),
        );
      }

      return chat;
    });

    return GeminiChat.of({
      createChat: Effect.fn(function* (model: GeminiModels) {
        const chat = yield* Ref.get(chatRef);

        if (chat) {
          return chat;
        }

        const newChat = yield* createChat(model);
        yield* Ref.set(chatRef, newChat);
        yield* Ref.set(modelRef, model);
        return newChat;
      }),
      getChat,
      sendMessage: Effect.fn(function* (message: string) {
        const chat = yield* getChat();
        const model = yield* Ref.get(modelRef);

        return yield* sendMessage({ chat, model, message });
      }),
      getHistory: Effect.fn(function* () {
        const chat = yield* getChat();

        return yield* getHistory(chat);
      }),
    });
  }),
);
