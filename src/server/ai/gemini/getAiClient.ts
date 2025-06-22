import 'server-only';

import { GoogleGenAI } from '@google/genai';
import { Effect } from 'effect';

export function getAiClient(): Effect.Effect<GoogleGenAI, Error> {
  if (!process.env.GEMINI_API_KEY) {
    return Effect.fail(new Error('GEMINI_API_KEY is not set'));
  }

  const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  return Effect.succeed(client);
}

export const DEFAULT_MODEL = 'gemini-2.0-flash-lite';
