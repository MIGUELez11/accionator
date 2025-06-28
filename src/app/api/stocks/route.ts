import { requireUser } from '@/lib/requireUser';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { getStockFullInfo } from '@/server/stocks/getStockFullInfo';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withPosthog(async (request: NextRequest) => {
  await requireUser();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const symbol = request.nextUrl.searchParams.get('symbol');

  try {
    const response = await getStockFullInfo(symbol);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    throw error;
  }
});
