import { Effect } from 'effect';
import { GeminiModels } from '..';
import { getAiClient } from '../getAiClient';

export const createChat = Effect.fn(function* (model: GeminiModels) {
  const ai = yield* getAiClient();

  const chat = ai.chats.create({ model });

  return chat;
});
