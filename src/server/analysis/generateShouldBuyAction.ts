import { Effect } from 'effect';
import { StockProfile } from '../types';
import { getAnalysis } from './utils/getAnalysis';
import { getPrompt } from './utils/getPrompt';

export const generateShouldBuyAction = Effect.fn(function* (analysis: string, stockInfo: StockProfile) {
  const prompt = yield* getPrompt('SHOULD_BUY_ACTION', {
    Analysis: analysis,
    StockInfo: JSON.stringify(stockInfo),
  });

  return yield* getAnalysis(prompt, true);
});
