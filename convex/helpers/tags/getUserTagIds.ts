import { DataModel } from '@convex/_generated/dataModel';
import { GenericQueryCtx } from 'convex/server';

async function getTagId(ctx: GenericQueryCtx<DataModel>, { userId, tag }: { userId: string; tag: string }) {
  const tagDoc = await ctx.db
    .query('operationTags')
    .withSearchIndex('by_tag', (q) => q.search('tag', tag).eq('userId', userId))
    .first();

  return tagDoc?._id ?? null;
}

export async function getTagIdsHelper(
  ctx: GenericQueryCtx<DataModel>,
  { userId, tags }: { userId: string; tags: string[] },
) {
  const tagIds = await Promise.all(tags.map((tag) => getTagId(ctx, { userId, tag })));

  return [...new Set(tagIds)];
}
