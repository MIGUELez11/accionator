import { Chat } from '@google/genai';
import { Effect } from 'effect';

export const getHistory = Effect.fn(function* (chat: Chat) {
  const history = chat.getHistory();

  return history;
});
