import { countTokens } from "@/server/ai/countTokens";
import { getResponseFromAI } from "@/server/ai/getResponseFromAI";
import { Effect } from 'effect';

function jsonParser(response: string): object {
  return JSON.parse(response.replace(/```json\n/g, '').replace(/\n```/g, ''));
}

export interface AnalysisResponse<T extends boolean = false> {
  response: T extends true ? object : string;
  inputTokens: number;
  outputTokens: number;
}

export function getAnalysis<T extends boolean = false>(
  prompt: string,
  parseResponse: T = false as T,
): Effect.Effect<AnalysisResponse<T>, Error> {
  return Effect.gen(function* () {
    const response = yield* getResponseFromAI(prompt);

    const promptTokens = yield* countTokens(prompt);
    const responseTokens = yield* countTokens(response);

    const responseObject: AnalysisResponse<T> = {
      response: (parseResponse ? jsonParser(response) : response) as T extends true ? object : string,
      inputTokens: promptTokens,
      outputTokens: responseTokens,
    };

    return responseObject;
  });
}
