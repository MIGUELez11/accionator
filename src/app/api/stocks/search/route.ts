import { withRequiredUser } from '@/lib/requireUser';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { searchSymbol } from '@/server/stocks/searchSymbol';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withRequiredUser(
  withPosthog(async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const exchange = searchParams.get('exchange');

    if (!query && query !== '') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const response = await searchSymbol({ query, exchange: exchange ?? undefined });

    return NextResponse.json(response);
  }),
);
