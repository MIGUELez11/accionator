import { DataModel, Doc } from '@convex/_generated/dataModel';
import { GenericMutationCtx, WithoutSystemFields } from 'convex/server';

export function addOperationHelper(
  ctx: GenericMutationCtx<DataModel>,
  { userId, operation }: { userId: string; operation: Omit<WithoutSystemFields<Doc<'operations'>>, 'userId'> },
) {
  return ctx.db.insert('operations', {
    ...operation,
    userId,
  });
}
