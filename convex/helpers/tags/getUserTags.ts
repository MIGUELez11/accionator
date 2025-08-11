import { DataModel, Doc } from "@convex/_generated/dataModel";
import { GenericQueryCtx } from "convex/server";

interface GetUserTagsHelperArgs {
  userId: string;
  query?: string;
}

export async function getUserTagsHelper(ctx: GenericQueryCtx<DataModel>, args: GetUserTagsHelperArgs) {
  const { userId, query } = args;

  let tags: Doc<'operationTags'>[] = [];

  const queryTags = ctx.db.query('operationTags');

  if (query) {
    tags = await queryTags.withSearchIndex('by_tag', (q) => q.search('tag', query).eq('userId', userId)).take(5);
  } else {
    tags = await queryTags.withIndex('by_user', (q) => q.eq('userId', userId)).take(5);
  }

  return tags.map((tag) => ({
    id: tag._id,
    tag: tag.tag,
    count: tag.count,
  }));
}