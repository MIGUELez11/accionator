import { mutation } from '@convex/_generated/server';
import { addOperationHelper } from '@convex/helpers/operation/add';
import { removeOperationHelper } from '@convex/helpers/operation/remove';
import { useTagsHelper } from '@convex/helpers/tags/useTags';
import { getUserId } from '@convex/helpers/users/getUserId';
import { v } from 'convex/values';

// Reusable validator for operation parameters
const operationParamsValidator = {
  symbol: v.string(),
  type: v.union(v.literal('buy'), v.literal('sell')),
  quantity: v.number(),
  price: v.number(),
  date: v.string(),
  tags: v.array(v.string()),
};

export const add = mutation({
  args: operationParamsValidator,
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

export const update = mutation({
  args: {
    id: v.id('operations'),
    ...operationParamsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx, true);
    const tagsIds = await useTagsHelper(ctx, { userId, tags: args.tags });

    // Verify the operation exists and belongs to the user
    const operation = await ctx.db.get(args.id);
    if (!operation) {
      throw new Error('Operation not found');
    }
    if (operation.userId !== userId) {
      throw new Error('Unauthorized');
    }

    // Update the operation
    await ctx.db.patch(args.id, {
      symbol: args.symbol,
      type: args.type,
      quantity: args.quantity,
      price: args.price,
      date: new Date(args.date).getTime(),
      tags: tagsIds,
    });

    return args.id;
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
