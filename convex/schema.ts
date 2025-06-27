import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  tokensCost: defineTable({
    type: v.union(v.literal('input'), v.literal('output')),
    cost: v.number(),
    perTokenCount: v.number(),
  }).index('by_type', ['type']),

  tokens: defineTable({
    userId: v.string(),

    inputTokensLimit: v.number(),
    outputTokensLimit: v.number(),

    usedInputTokens: v.number(),
    usedOutputTokens: v.number(),

    subscriptionType: v.union(v.literal('monthly'), v.literal('lifetime')),
    subscriptionRenewDate: v.union(v.number(), v.null()),
  }).index('by_user', ['userId']),
});
