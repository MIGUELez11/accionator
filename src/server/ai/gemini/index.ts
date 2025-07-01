import { AIService } from '../AIService';
import { countGeminiTokens } from './countGeminiTokens';
import { getResponseFromGemini } from './getResponseFromGemini';

export const GeminiAIService = AIService.of({
  countTokens: countGeminiTokens,
  generateResponse: getResponseFromGemini,
});

export type GeminiModels = 'gemini-2.0-flash-lite';
