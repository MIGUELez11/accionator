import { DataModel, Id } from '@convex/_generated/dataModel';
import { GenericMutationCtx } from 'convex/server';
import { getUserId } from '../users/getUserId';

interface RemoveOperationHelperArgs {
  operationId: Id<'operations'>;
}

export async function removeOperationHelper(
  ctx: GenericMutationCtx<DataModel>,
  { operationId }: RemoveOperationHelperArgs,
) {
  const userId = await getUserId(ctx, true);

  const id = ctx.db.normalizeId('operations', operationId);
  if (!id) {
    throw new Error('Invalid operation ID');
  }

  const operation = await ctx.db.get(id);

  if (!operation || operation.userId !== userId) {
    throw new Error('Operation not found');
  }

  await ctx.db.delete(id);

  return true;
}
