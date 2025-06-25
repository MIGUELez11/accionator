import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  tokens: defineTable({
    userId: v.string(),

    inputTokensLimit: v.number(),
    outputTokensLimit: v.number(),

    usedInputTokens: v.number(),
    usedOutputTokens: v.number(),
  }).index('by_user', ['userId']),
});
