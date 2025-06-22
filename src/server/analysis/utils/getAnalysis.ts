import { countTokens } from "@/server/ai/countTokens";
import { getResponseFromAI } from "@/server/ai/getResponseFromAI";

function jsonParser(response: string): object {
  return JSON.parse(response.replace(/```json\n/g, "").replace(/\n```/g, ""));
}

export async function getAnalysis<T extends boolean = false>(
  prompt: string,
  parseResponse: T = false as T,
): Promise<{
  response: T extends true ? object : string;
  inputTokens: number;
  outputTokens: number;
}> {
  const response = await getResponseFromAI(prompt);

  const promptTokens = await countTokens(prompt);
  const responseTokens = await countTokens(response);

  return {
    response: (parseResponse
      ? jsonParser(response)
      : response) as T extends true ? object : string,
    inputTokens: promptTokens,
    outputTokens: responseTokens,
  };
}
