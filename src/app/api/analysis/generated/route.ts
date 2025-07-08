import { withRequiredUser } from '@/lib/requireUser';
import { getCache } from '@/server/cache/getCache';
import { AIAnalysisResponse } from '@/server/types';
import { Effect } from 'effect';
import { NextResponse } from 'next/server';

export const GET = withRequiredUser(async (req) => {
  const symbol = req.nextUrl.searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  const cache = await Effect.runPromise(getCache(`ai-analysis:${symbol}`));

  if (!cache) {
    return NextResponse.json(null);
  }

  return NextResponse.json(cache as AIAnalysisResponse);
});
