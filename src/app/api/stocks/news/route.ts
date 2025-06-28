import { getCompanyNews } from '@/server/stocks/getCompanyNews';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const symbol = request.nextUrl.searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  const news = await getCompanyNews(symbol);
  return NextResponse.json(news);
};
