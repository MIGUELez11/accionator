import { requireUser } from '@/lib/requireUser';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { getStockFullInfo } from '@/server/stocks/getStockFullInfo';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withPosthog(async (request: NextRequest) => {
  await requireUser();

  const symbol = request.nextUrl.searchParams.get('symbol');

  try {
    const response = await getStockFullInfo(symbol);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      // Handle specific error types appropriately
      if (error.message === 'Stock not found' || error.message === 'Symbol is required') {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      // For other errors, return 500
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    throw error;
  }
});
