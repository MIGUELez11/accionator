import { countGeminiTokens } from "./gemini/countGeminiTokens";
import { getResponseFromGemini } from "./gemini/getResponseFromGemini";

export const models = {
  gemini: {
    generate: getResponseFromGemini,
    countTokens: countGeminiTokens,
  },
} as const;

export type Models = keyof typeof models;
