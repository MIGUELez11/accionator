import { countTokens } from "@/server/ai/countTokens";
import { getResponseFromAI } from "@/server/ai/getResponseFromAI";

export async function getAnalysis(prompt: string) {
  const response = await getResponseFromAI(prompt);

  const promptTokens = await countTokens(prompt);
  const responseTokens = await countTokens(response);

  return { response, inputTokens: promptTokens, outputTokens: responseTokens };
}
