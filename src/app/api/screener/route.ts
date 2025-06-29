import { withRequiredUser } from '@/lib/requireUser';
import { withPosthog } from '@/server/posthog/logPosthogApiCall';
import { getScreening } from '@/server/stocks/getScreening';
import { Screeners } from '@/server/types';
import { NextResponse } from 'next/server';

export const GET = withRequiredUser(
  withPosthog(async (request) => {
    const { searchParams } = new URL(request.url);
    const screener = searchParams.get('screener');
    if (!screener) {
      throw new Error('Screener is required');
    }

    const data = await getScreening(screener as Screeners);
    return NextResponse.json(data);
  }),
);

