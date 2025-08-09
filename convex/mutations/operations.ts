import { mutation } from '@convex/_generated/server';
import { addOperationHelper } from '@convex/helpers/operation/add';
import { removeOperationHelper } from '@convex/helpers/operation/remove';
import { useTagsHelper } from '@convex/helpers/tags/useTags';
import { getUserId } from '@convex/helpers/users/getUserId';
import { v } from 'convex/values';

export const add = mutation({
  args: {
    symbol: v.string(),
    type: v.union(v.literal('buy'), v.literal('sell')),
    quantity: v.number(),
    price: v.number(),
    date: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx, true);
    const tagsIds = await useTagsHelper(ctx, { userId, tags: args.tags });

    return addOperationHelper(ctx, {
      userId,
      operation: {
        ...args,
        tags: tagsIds,
        date: new Date(args.date).getTime(),
      },
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id('operations'),
  },
  handler: async (ctx, args) => {
    await removeOperationHelper(ctx, { operationId: args.id });
  },
});