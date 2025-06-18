import path from "path";

export const PROMPTS_DIR = path.join(__dirname, "..");

export const PROMPTS = {
  NEWS_SUMMARY: {
    path: () => import("./news_summary_prompt.md"),
    replaces: ["News", "StockInfo"],
  },
  FINANCIAL_ANALYSIS: {
    path: () => import("./financial_analysis_prompt.md"),
    replaces: ["News", "BasicFinancials", "Quote"],
  },
} as const;

export type PromptsNames = keyof typeof PROMPTS;
export type PromptReplaces<T extends PromptsNames> =
  (typeof PROMPTS)[T]["replaces"][number];
