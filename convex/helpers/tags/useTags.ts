import { DataModel } from "@convex/_generated/dataModel";
import { GenericMutationCtx } from "convex/server";
import { createUserTagHelper } from "./createUserTag";
import { getTagIdsHelper } from "./getUserTagIds";

export async function useTagsHelper(ctx: GenericMutationCtx<DataModel>, { userId, tags }: { userId: string, tags: string[] }) {
  const tagsIds = await getTagIdsHelper(ctx, { userId, tags });

  return Promise.all(tags.map(async (tag, index) => {
    let id = tagsIds[index];

    if (!id) {
      id = await createUserTagHelper(ctx, { userId, tag });
      tagsIds[index] = id;
    }

    const tagDoc = await ctx.db.get(id);
    if (tagDoc) {
      await ctx.db.patch(id, { count: tagDoc.count + 1 });
    }

    return id;
  }));
}