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
import type * as helpers_stocks_getSearchedSectors from "../helpers/stocks/getSearchedSectors.js";
import type * as helpers_stocks_getSearchedStocks from "../helpers/stocks/getSearchedStocks.js";
import type * as helpers_stocks_saveSearchedStock from "../helpers/stocks/saveSearchedStock.js";
import type * as helpers_tokens_cost_getTokensCost from "../helpers/tokens/cost/getTokensCost.js";
import type * as helpers_tokens_getRemainingTokens from "../helpers/tokens/getRemainingTokens.js";
import type * as helpers_tokens_getTokens from "../helpers/tokens/getTokens.js";
import type * as helpers_tokens_index from "../helpers/tokens/index.js";
import type * as helpers_tokens_renewTokens from "../helpers/tokens/renewTokens.js";
import type * as helpers_tokens_useTokens from "../helpers/tokens/useTokens.js";
import type * as helpers_users_getUsageStats from "../helpers/users/getUsageStats.js";
import type * as helpers_users_getUserId from "../helpers/users/getUserId.js";
import type * as mutations_tokens from "../mutations/tokens.js";
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
  "helpers/stocks/getSearchedSectors": typeof helpers_stocks_getSearchedSectors;
  "helpers/stocks/getSearchedStocks": typeof helpers_stocks_getSearchedStocks;
  "helpers/stocks/saveSearchedStock": typeof helpers_stocks_saveSearchedStock;
  "helpers/tokens/cost/getTokensCost": typeof helpers_tokens_cost_getTokensCost;
  "helpers/tokens/getRemainingTokens": typeof helpers_tokens_getRemainingTokens;
  "helpers/tokens/getTokens": typeof helpers_tokens_getTokens;
  "helpers/tokens/index": typeof helpers_tokens_index;
  "helpers/tokens/renewTokens": typeof helpers_tokens_renewTokens;
  "helpers/tokens/useTokens": typeof helpers_tokens_useTokens;
  "helpers/users/getUsageStats": typeof helpers_users_getUsageStats;
  "helpers/users/getUserId": typeof helpers_users_getUserId;
  "mutations/tokens": typeof mutations_tokens;
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
