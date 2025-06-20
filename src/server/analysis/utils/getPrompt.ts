import { PROMPTS, PromptsNames, PromptReplaces } from "../prompts";

export async function getPrompt<T extends PromptsNames>(
  promptName: T,
  replaces: Record<PromptReplaces<T>, string>,
) {
  const { default: prompt } = await PROMPTS[promptName].path();

  const fullReplaces = {
    ...replaces,
    ...{
      Date: `Ahora mismo son las: ${new Date().toISOString()}`,
    },
  };

  let promptWithReplaces = prompt;

  for (const [key, value] of Object.entries(fullReplaces)) {
    promptWithReplaces = promptWithReplaces.replace(
      `<${key} />`,
      `<${key}>
  ${value}
</${key}>`,
    );
  }

  return promptWithReplaces;
}
