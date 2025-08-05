import { query } from "@convex/_generated/server";
import { paginateHistoryOperationsHelper } from "@convex/helpers/operation/paginateHistory";
import { getUserId } from "@convex/helpers/users/getUserId";
import { paginationOptsValidator } from "convex/server";

export const listOperations = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { paginationOpts } = args

    const userId = await getUserId(ctx, true)
    const operations = await paginateHistoryOperationsHelper(ctx, { userId, paginationOpts })

    return operations
  }
})