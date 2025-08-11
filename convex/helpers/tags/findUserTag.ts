import { DataModel } from "@convex/_generated/dataModel";
import { GenericQueryCtx } from "convex/server";

interface FindUserTagHelperArgs {
  userId: string;
  tag: string;
}

export async function findUserTagHelper(ctx: GenericQueryCtx<DataModel>, args: FindUserTagHelperArgs) {
  const { userId, tag } = args;

  return ctx.db.query('operationTags').withSearchIndex('by_tag', (q) => q.search('tag', tag).eq('userId', userId)).first();
}