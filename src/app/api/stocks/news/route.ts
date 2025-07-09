import { FinnhubCachedStocksService } from '@/server/stocks/data/finnhub/service';
import { Effect } from 'effect';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const symbol = request.nextUrl.searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    const stockService = await Effect.runPromise(FinnhubCachedStocksService);
    const news = await Effect.runPromise(stockService.getCompanyNews(symbol));

    return NextResponse.json(news);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch company news' }, { status: 500 });
  }
};
