import { withRequiredUser } from '@/lib/requireUser';
import { removeCache } from '@/server/cache/removeCache';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { Effect } from 'effect';
import { NextResponse } from 'next/server';

export const GET = withRequiredUser(
  withPosthog(async (request) => {
    const symbol = request.nextUrl.searchParams.get('symbol');

    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    await Effect.runPromise(removeCache(`ai-analysis:${symbol}`));

    return NextResponse.json({ message: `Cache removed for ${symbol}`, success: true, symbol }, { status: 200 });
  }),
);
