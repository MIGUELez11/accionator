import { DataModel } from "@convex/_generated/dataModel";
import { GenericQueryCtx, PaginationOptions } from "convex/server";
import { getUserTagByIdHelper } from "../tags/getUserTagById";

interface Params {
  userId: string,
  paginationOpts: PaginationOptions
}

function filterOutNull<T>(array: (T | null)[]): T[] {
  return array.filter(item => item !== null) as T[];
}

export async function paginateHistoryOperationsHelper(ctx: GenericQueryCtx<DataModel>, {userId, paginationOpts}: Params) {
  const operations = await ctx.db.query('operations').withIndex('by_user', q => q.eq('userId', userId))
    .order('desc')
    .paginate(paginationOpts)


  const page = await Promise.all(operations.page.map(async operation => {
    const tags = await Promise.all(operation.tags.map(tagId => getUserTagByIdHelper(ctx, { tagId })))
    const nonNullTags = filterOutNull(tags)

    return {
      ...operation,
      tags: nonNullTags
    }
  }))

  return {
    ...operations,
    page
  }
}