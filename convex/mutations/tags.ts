import { mutation } from "@convex/_generated/server";
import { createUserTagHelper } from "@convex/helpers/tags/createUserTag";
import { getUserId } from "@convex/helpers/users/getUserId";
import { v } from "convex/values";

export const use = mutation({
  args: { tag: v.string() },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx, true);

    return createUserTagHelper(ctx, { userId, tag: args.tag });
  },
});