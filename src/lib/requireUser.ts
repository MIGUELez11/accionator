import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized: User not logged in');
    this.name = 'UnauthorizedError';
  }
}

/**
 * Throws an error if the user is not authenticated.
 * Returns the userId if authenticated.
 */
export async function requireUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new UnauthorizedError();
  }

  return userId;
}

export const withRequiredUser =
  <TContext>(fn: (req: NextRequest, ctx: TContext) => Promise<NextResponse | void>) =>
  async (req: NextRequest, ctx: TContext) => {
    await requireUser();
    return fn(req, ctx);
  };
