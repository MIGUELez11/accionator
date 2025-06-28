import { mutation } from '@convex/_generated/server';
import { saveSearchedStockHelper } from '@convex/helpers/stocks/saveSearchedStock';
import { Infer, v } from 'convex/values';

const stockSchema = v.object({
  stock: v.string(),
  sector: v.string(),
});

export type SaveSearchedStock = Infer<typeof stockSchema>;

export const saveSearchedStock = mutation({
  args: stockSchema,
  handler: async (ctx, args) => {
    return saveSearchedStockHelper(ctx, args);
  },
});
