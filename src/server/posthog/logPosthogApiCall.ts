import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { EventMessage } from 'posthog-node';
import { getPosthogClient } from './getPosthogClient';

export type LogPosthogApiCallProps = Omit<EventMessage, 'distinctId'> & {
  userId: string | null;
};

export type LogPosthogApiCallErrorProps = {
  userId: string | null;
  error: Error;
  properties: Record<string, string>;
};

export async function logPosthogApiCall({ userId, ...props }: LogPosthogApiCallProps) {
  const posthogClient = getPosthogClient();

  const distinctId = userId ?? 'anonymous';

  posthogClient.capture({ ...props, distinctId });
  await posthogClient.shutdown();
}

export async function logPosthogApiCallError({ userId, error, properties }: LogPosthogApiCallErrorProps) {
  const posthogClient = getPosthogClient();

  const distinctId = userId ?? 'anonymous';

  posthogClient.captureException(error, distinctId, properties);
  await posthogClient.shutdown();
}

export function withPosthog<TContext>(fn: (req: NextRequest, ctx: TContext) => Promise<NextResponse | void>) {
  return async (req: NextRequest, ctx: TContext) => {
    const { userId } = await auth();

    await logPosthogApiCall({
      userId,
      event: 'api_call',
      properties: {
        path: req.nextUrl.pathname,
      },
    });

    try {
      return await fn(req, ctx);
    } catch (error) {
      await logPosthogApiCallError({
        userId,
        error: error as Error,
        properties: {
          path: req.nextUrl.pathname,
        },
      });

      throw error;
    }
  };
}
