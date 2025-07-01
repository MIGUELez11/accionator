import { AIService } from '../AIService';
import { countGeminiTokens } from './countGeminiTokens';
import { getResponseFromGemini } from './getResponseFromGemini';

export const GeminiAIService = (model: GeminiModels) =>
  AIService.of({
    countTokens: countGeminiTokens(model),
    generateResponse: getResponseFromGemini(model),
  });

export type GeminiModels = 'gemini-2.0-flash-lite' | 'gemini-2.0-flash' | 'gemini-2.5-pro' | 'gemini-2.5-flash';

export const GeminiModelServices: Record<GeminiModels, AIService['Type']> = {
  'gemini-2.0-flash-lite': GeminiAIService('gemini-2.0-flash-lite'),
  'gemini-2.0-flash': GeminiAIService('gemini-2.0-flash'),
  'gemini-2.5-pro': GeminiAIService('gemini-2.5-pro'),
  'gemini-2.5-flash': GeminiAIService('gemini-2.5-flash'),
};