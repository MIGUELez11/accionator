import { withRequiredUser } from "@/lib/requireUser";
import { removeCache } from "@/server/cache/removeCache";
import { withPosthog } from "@/server/posthog/logPosthogApiCall";
import { Effect } from "effect";
import { NextResponse } from "next/server";

const INVESTMENT_PLAN_CACHE_KEY = 'investmentPlan';

export const GET = withRequiredUser(
  withPosthog(async () => {
    try {
      const removedKeysCount = await Effect.runPromise(removeCache(INVESTMENT_PLAN_CACHE_KEY));

      return NextResponse.json({ message: `Cache removed ${removedKeysCount} keys`, success: removedKeysCount > 0 });
    } catch (error) {
      console.error('Failed to remove cache:', error);

      return NextResponse.json(
        {
          message: 'Failed to refresh investment plan cache',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        },
        { status: 500 },
      );
    }
  }),
);