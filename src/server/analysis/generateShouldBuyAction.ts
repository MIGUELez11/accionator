import { Effect } from 'effect';
import { StockProfile } from '../types';
import { AnalysisResponse, getAnalysis } from './utils/getAnalysis';
import { getPrompt } from './utils/getPrompt';

export function generateShouldBuyAction(
  analysis: string,
  stockInfo: StockProfile,
): Effect.Effect<AnalysisResponse<true>, Error> {
  return Effect.gen(function* () {
    const prompt = yield* getPrompt('SHOULD_BUY_ACTION', {
      Analysis: analysis,
      StockInfo: JSON.stringify(stockInfo),
    });

    return yield* getAnalysis(prompt, true);
  });
}
