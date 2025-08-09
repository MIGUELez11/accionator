/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as helpers_operation_add from "../helpers/operation/add.js";
import type * as helpers_operation_investmentPerformance from "../helpers/operation/investmentPerformance.js";
import type * as helpers_operation_paginateHistory from "../helpers/operation/paginateHistory.js";
import type * as helpers_operation_remove from "../helpers/operation/remove.js";
import type * as helpers_stocks_getSearchedSectors from "../helpers/stocks/getSearchedSectors.js";
import type * as helpers_stocks_getSearchedStocks from "../helpers/stocks/getSearchedStocks.js";
import type * as helpers_stocks_saveSearchedStock from "../helpers/stocks/saveSearchedStock.js";
import type * as helpers_tags_createUserTag from "../helpers/tags/createUserTag.js";
import type * as helpers_tags_findUserTag from "../helpers/tags/findUserTag.js";
import type * as helpers_tags_getUserTagById from "../helpers/tags/getUserTagById.js";
import type * as helpers_tags_getUserTagIds from "../helpers/tags/getUserTagIds.js";
import type * as helpers_tags_getUserTags from "../helpers/tags/getUserTags.js";
import type * as helpers_tags_useTags from "../helpers/tags/useTags.js";
import type * as helpers_tokens_cost_getTokensCost from "../helpers/tokens/cost/getTokensCost.js";
import type * as helpers_tokens_getRemainingTokens from "../helpers/tokens/getRemainingTokens.js";
import type * as helpers_tokens_getTokens from "../helpers/tokens/getTokens.js";
import type * as helpers_tokens_historical_getHistoricalUsage from "../helpers/tokens/historical/getHistoricalUsage.js";
import type * as helpers_tokens_historical_saveHistoricalUsage from "../helpers/tokens/historical/saveHistoricalUsage.js";
import type * as helpers_tokens_index from "../helpers/tokens/index.js";
import type * as helpers_tokens_renewTokens from "../helpers/tokens/renewTokens.js";
import type * as helpers_tokens_useTokens from "../helpers/tokens/useTokens.js";
import type * as helpers_users_getUsageStats from "../helpers/users/getUsageStats.js";
import type * as helpers_users_getUserId from "../helpers/users/getUserId.js";
import type * as mutations_operations from "../mutations/operations.js";
import type * as mutations_stocks from "../mutations/stocks.js";
import type * as mutations_tags from "../mutations/tags.js";
import type * as mutations_tokens from "../mutations/tokens.js";
import type * as queries_operations from "../queries/operations.js";
import type * as queries_tags from "../queries/tags.js";
import type * as queries_tokens from "../queries/tokens.js";
import type * as queries_users from "../queries/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "helpers/operation/add": typeof helpers_operation_add;
  "helpers/operation/investmentPerformance": typeof helpers_operation_investmentPerformance;
  "helpers/operation/paginateHistory": typeof helpers_operation_paginateHistory;
  "helpers/operation/remove": typeof helpers_operation_remove;
  "helpers/stocks/getSearchedSectors": typeof helpers_stocks_getSearchedSectors;
  "helpers/stocks/getSearchedStocks": typeof helpers_stocks_getSearchedStocks;
  "helpers/stocks/saveSearchedStock": typeof helpers_stocks_saveSearchedStock;
  "helpers/tags/createUserTag": typeof helpers_tags_createUserTag;
  "helpers/tags/findUserTag": typeof helpers_tags_findUserTag;
  "helpers/tags/getUserTagById": typeof helpers_tags_getUserTagById;
  "helpers/tags/getUserTagIds": typeof helpers_tags_getUserTagIds;
  "helpers/tags/getUserTags": typeof helpers_tags_getUserTags;
  "helpers/tags/useTags": typeof helpers_tags_useTags;
  "helpers/tokens/cost/getTokensCost": typeof helpers_tokens_cost_getTokensCost;
  "helpers/tokens/getRemainingTokens": typeof helpers_tokens_getRemainingTokens;
  "helpers/tokens/getTokens": typeof helpers_tokens_getTokens;
  "helpers/tokens/historical/getHistoricalUsage": typeof helpers_tokens_historical_getHistoricalUsage;
  "helpers/tokens/historical/saveHistoricalUsage": typeof helpers_tokens_historical_saveHistoricalUsage;
  "helpers/tokens/index": typeof helpers_tokens_index;
  "helpers/tokens/renewTokens": typeof helpers_tokens_renewTokens;
  "helpers/tokens/useTokens": typeof helpers_tokens_useTokens;
  "helpers/users/getUsageStats": typeof helpers_users_getUsageStats;
  "helpers/users/getUserId": typeof helpers_users_getUserId;
  "mutations/operations": typeof mutations_operations;
  "mutations/stocks": typeof mutations_stocks;
  "mutations/tags": typeof mutations_tags;
  "mutations/tokens": typeof mutations_tokens;
  "queries/operations": typeof queries_operations;
  "queries/tags": typeof queries_tags;
  "queries/tokens": typeof queries_tokens;
  "queries/users": typeof queries_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
