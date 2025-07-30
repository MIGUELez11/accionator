import { withRequiredUser } from "@/lib/requireUser";
import { removeCache } from "@/server/cache/removeCache";
import { withPosthog } from "@/server/posthog/logPosthogApiCall";
import { Effect } from "effect";
import { NextResponse } from "next/server";

export const GET = withRequiredUser(
  withPosthog(async () => {
    const removedKeysCount = await Effect.runPromise(removeCache('investmentPlan'));

    return NextResponse.json({ message: `Cache removed ${removedKeysCount} keys`, success: removedKeysCount > 0 });
  }),
);