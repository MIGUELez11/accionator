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
    subscriptionRenewDate: v.number(),
  }).index('by_user', ['userId']),
  historicalUsage: defineTable({
    userId: v.string(),
    cost: v.number(),
    inputTokens: v.number(),
    outputTokens: v.number(),
    month: v.number(),
    year: v.number(),
    date: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_date', ['userId', 'date']),

  stocksSearched: defineTable({
    userId: v.string(),
    stock: v.string(),
    count: v.number(),
    lastSearched: v.number(),
  })
    .index('by_user_stock', ['userId', 'stock'])
    .index('by_user_last_searched', ['userId', 'lastSearched']),
  sectorsSearched: defineTable({
    userId: v.string(),
    sector: v.string(),
    count: v.number(),
    lastSearched: v.number(),
  })
    .index('by_user_sector', ['userId', 'sector'])
    .index('by_user_last_searched', ['userId', 'lastSearched']),

  operationTags: defineTable({
    userId: v.string(),
    tag: v.string(),
    count: v.number(),
  })
    .index('by_user', ['userId'])
    .searchIndex('by_tag', { searchField: 'tag', filterFields: ['userId'] }),

  operations: defineTable({
    userId: v.string(),
    symbol: v.string(),
    type: v.union(v.literal('buy'), v.literal('sell')),
    quantity: v.number(),
    price: v.number(),
    date: v.number(),
    tags: v.array(v.id('operationTags')),
  })
    .index('by_user', ['userId'])
    .index('by_user_date', ['userId', 'date'])
    .index('by_user_symbol', ['userId', 'symbol']),
});
