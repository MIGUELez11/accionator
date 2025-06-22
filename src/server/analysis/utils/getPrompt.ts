import { Effect } from 'effect';
import { PromptReplaces, PROMPTS, PromptsNames } from '../prompts';

export function getPrompt<T extends PromptsNames>(
  promptName: T,
  replaces: Record<PromptReplaces<T>, string>,
): Effect.Effect<string, Error> {
  return Effect.gen(function* () {
    const { default: prompt } = yield* Effect.tryPromise({
      try: () => PROMPTS[promptName].path(),
      catch: (error) =>
        new Error(`Error getting prompt: ${error instanceof Error ? error.message : 'Unknown error'}`, {
          cause: error,
        }),
    });

    try {
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
    } catch (error) {
      return (
        yield *
        Effect.fail(
          new Error(`Error parsing prompt: ${error instanceof Error ? error.message : 'Unknown error'}`, {
            cause: error,
          }),
        )
      );
    }
  });
}
