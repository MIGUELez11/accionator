import { AIService } from '@/server/ai/AIService';
import { Effect } from 'effect';

function jsonParser(response: string): object {
  return JSON.parse(response.replace(/```json\n/g, '').replace(/\n```/g, ''));
}

export interface AnalysisResponse<T extends boolean = false> {
  response: T extends true ? object : string;
  inputTokens: number;
  outputTokens: number;
}

export const getAnalysis = Effect.fn(function* <T extends boolean = false>(
  prompt: string,
  parseResponse: T = false as T,
) {
  const aiService = yield* AIService;

  const response = yield* aiService.chat.sendMessage(prompt);

  const promptTokens = yield* aiService.countTokens(prompt);
  const responseTokens = yield* aiService.countTokens(response);

  const responseObject: AnalysisResponse<T> = {
    response: (parseResponse ? jsonParser(response) : response) as T extends true ? object : string,
    inputTokens: promptTokens,
    outputTokens: responseTokens,
  };

  return responseObject;
});
