import { DataModel, Id } from "@convex/_generated/dataModel";
import { GenericMutationCtx } from "convex/server";
import { findUserTagHelper } from "./findUserTag";

interface CreateUserTagHelperArgs {
  userId: string;
  tag: string;
}

export async function createUserTagHelper(ctx: GenericMutationCtx<DataModel>, args: CreateUserTagHelperArgs) {
  const { userId, tag } = args;

  const existingTag = await findUserTagHelper(ctx, { userId, tag });

  let tagId: Id<"operationTags">;

  if (existingTag) {
    await ctx.db.patch(existingTag._id, { count: existingTag.count + 1 });

    tagId = existingTag._id;
  } else {
    tagId = await ctx.db.insert('operationTags', { userId, tag, count: 1 });
  }

  return tagId;
}