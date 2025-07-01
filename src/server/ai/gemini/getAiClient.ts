import 'server-only';

import { GoogleGenAI } from '@google/genai';
import { Effect } from 'effect';
import { ApiKeyMissingError } from '../AiErrors';

export function getAiClient(): Effect.Effect<GoogleGenAI, ApiKeyMissingError> {
  if (!process.env.GEMINI_API_KEY) {
    return Effect.fail(new ApiKeyMissingError({ provider: 'gemini' }));
  }

  const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  return Effect.succeed(client);
}

export const DEFAULT_MODEL = 'gemini-2.0-flash-lite';
