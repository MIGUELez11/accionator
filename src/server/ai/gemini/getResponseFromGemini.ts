import { DEFAULT_MODEL, getAiClient } from "./getAiClient";

export async function getResponseFromGemini(prompt: string) {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: DEFAULT_MODEL,
    contents: prompt,
  });

  return response.text ?? "";
}
