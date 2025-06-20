import { models, Models } from "./models";

export async function getResponseFromAI(
  prompt: string,
  model: Models = "gemini",
) {
  const modelObject = models[model];

  if (!modelObject) {
    throw new Error(`Model ${model} not found`);
  }

  const response = await modelObject.generate(prompt);

  return response;
}
