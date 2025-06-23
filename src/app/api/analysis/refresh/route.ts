import { removeCache } from '@/server/cache/removeCache';
import { Effect } from 'effect';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  await Effect.runPromise(removeCache(`ai-analysis:${symbol}`));

  return NextResponse.json({ message: `Cache removed for ${symbol}`, success: true, symbol }, { status: 200 });
}
