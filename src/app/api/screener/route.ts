import { withRequiredUser } from '@/lib/requireUser';
import { getScreening, Screeners } from '@/server/stocks/getScreening';
import { NextResponse } from 'next/server';

export const GET = withRequiredUser(async (request) => {
  const { searchParams } = new URL(request.url);
  const screener = searchParams.get('screener');
  if (!screener) {
    return NextResponse.json({ error: 'Screener is required' }, { status: 400 });
  }
  const data = await getScreening(screener as Screeners);
  return NextResponse.json(data);
});
