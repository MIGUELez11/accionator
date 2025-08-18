import { Effect } from 'effect';
import { AIService } from '../ai/AIService';
import { getAIService } from '../ai/getAIService';
import { AnalysisResponse, getAnalysis } from '../analysis/utils/getAnalysis';
import { getPrompt } from '../analysis/utils/getPrompt';
import { getScreening } from '../stocks/screeners';

export const pickStocksToSearch = Effect.gen(function* () {
  yield* Effect.log('Screening stocks');
  const [highVolatilityWithGrow, nasdaq100, pennyHighBeta, pennyStocksHighVolume] = yield* Effect.all([
    getScreening('highVolatilityWithGrow'),
    getScreening('nasdaq100'),
    getScreening('pennyHighBeta'),
    getScreening('pennyStocksHighVolume'),
  ]);

  yield* Effect.log('Screening stocks done');

  const screenedStocks = {
    highVolatilityWithGrow,
    nasdaq100,
    pennyHighBeta,
    pennyStocksHighVolume,
  };

  yield* Effect.log('Getting prompt');
  const prompt = yield* getPrompt('PICK_STOCKS_TO_SEARCH', {
    ScreenedStocks: JSON.stringify(screenedStocks),
  });

  yield* Effect.log('Getting analysis');

  const aiService = yield* getAIService('gemini-2.0-flash');
  yield* aiService.chat.initialize();
  const response = yield* getAnalysis(prompt, true).pipe(Effect.provideService(AIService, aiService));

  yield* Effect.log('Analysis done');

  return response as Omit<AnalysisResponse<true>, 'response'> & { response: string[] };
});
