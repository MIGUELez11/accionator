import { DEFAULT_MODEL, getAiClient } from "./getAiClient";

export async function countGeminiTokens(text: string) {
  const ai = getAiClient();

  if (!text.length) {
    return 0;
  }

  const response = await ai.models.countTokens({
    model: DEFAULT_MODEL,
    contents: text,
  });

  return response.totalTokens ?? 0;
}
