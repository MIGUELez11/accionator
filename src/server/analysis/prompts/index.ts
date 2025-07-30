import path from "path";

export const PROMPTS_DIR = path.join(__dirname, "..");

export const PROMPTS = {
  NEWS_SUMMARY: {
    path: () => import('./news_summary_prompt.md'),
    replaces: ['News', 'StockInfo'],
  },
  FINANCIAL_ANALYSIS: {
    path: () => import('./financial_analysis_prompt.md'),
    replaces: ['News', 'BasicFinancials', 'Quote'],
  },
  SHOULD_BUY_ACTION: {
    path: () => import('./should_buy_action_prompt.md'),
    replaces: ['Analysis', 'StockInfo'],
  },
  PICK_STOCKS_TO_SEARCH: {
    path: () => import('./pick_potential_stocks_prompt.md'),
    replaces: ['ScreenedStocks'],
  },
  INVESTMENT_PLAN: {
    path: () => import('./investment_plan_prompt.md'),
    replaces: ['StocksAnalysis'],
  },
} as const;

export type PromptsNames = keyof typeof PROMPTS;
export type PromptReplaces<T extends PromptsNames> =
  (typeof PROMPTS)[T]["replaces"][number];
