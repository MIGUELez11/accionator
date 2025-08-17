import { Chat } from '@google/genai';
import { Effect } from 'effect';
import { GeminiModels } from '..';
import { AIServiceError } from '../../AiErrors';

interface SendMessageProps {
  readonly chat: Chat;
  readonly model: GeminiModels;
  readonly message: string;
}

export const sendMessage = Effect.fn(function* ({ chat, model, message }: SendMessageProps) {
  const response = yield* Effect.tryPromise({
    try: () =>
      chat.sendMessage({
        message,
      }),
    catch: (error) =>
      new AIServiceError({
        message: `Error sending message`,
        cause: error,

        provider: 'gemini',
        model,
      }),
  });

  return response.text ?? '';
});
