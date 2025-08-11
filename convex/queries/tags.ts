import { query } from "@convex/_generated/server";
import { getUserTagsHelper } from "@convex/helpers/tags/getUserTags";
import { getUserId } from "@convex/helpers/users/getUserId";
import { v } from "convex/values";

export const list = query({
  args: { query: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx, true);

    return getUserTagsHelper(ctx, { userId, query: args.query });
  },
});

