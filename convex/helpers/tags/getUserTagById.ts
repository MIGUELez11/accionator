import { DataModel, Id } from "@convex/_generated/dataModel";
import { GenericQueryCtx } from "convex/server";
import { getUserId } from "../users/getUserId";

interface GetUserTagByIdHelperArgs {
  tagId: Id<'operationTags'>;
}

export async function getUserTagByIdHelper(ctx: GenericQueryCtx<DataModel>, { tagId }: GetUserTagByIdHelperArgs) {
  const userId = await getUserId(ctx, true);
  const tag = await ctx.db.get(tagId)

  if (!tag) {
    return null;
  }

  if (tag.userId !== userId) {
    return null;
  }

  return { id: tag._id, tag: tag.tag };
}