import { DataModel } from '@convex/_generated/dataModel';
import { GenericActionCtx, GenericMutationCtx, GenericQueryCtx } from 'convex/server';
import { ConvexError } from 'convex/values';

type GenericContext = GenericQueryCtx<DataModel> | GenericMutationCtx<DataModel> | GenericActionCtx<DataModel>;
type GetUserIdReturnType<ThrowIfNotAuthenticated extends boolean> = ThrowIfNotAuthenticated extends true
  ? string
  : string | null;

export async function getUserId<ThrowIfNotAuthenticated extends boolean = false>(
  ctx: GenericContext,
  throwIfNotAuthenticated?: ThrowIfNotAuthenticated,
): Promise<GetUserIdReturnType<ThrowIfNotAuthenticated>> {
  const user = await ctx.auth.getUserIdentity();

  if (!user) {
    if (throwIfNotAuthenticated) {
      throw new ConvexError('User not authenticated');
    }

    return null as GetUserIdReturnType<ThrowIfNotAuthenticated>;
  }

  return user.subject;
}
