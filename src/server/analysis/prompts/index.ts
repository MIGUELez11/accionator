import path from "path";

export const PROMPTS_DIR = path.join(__dirname, "..");

console.log("PROMPTS_DIR", PROMPTS_DIR);

export const PROMPTS = {
  NEWS_SUMMARY: {
    path: () => import("./news_summary_prompt.md"),
    replaces: ["News", "StockInfo"],
  },
} as const;

export type PromptsNames = keyof typeof PROMPTS;
export type PromptReplaces<T extends PromptsNames> =
  (typeof PROMPTS)[T]["replaces"][number];
