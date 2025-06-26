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
import type * as helpers_tokens_getRemainingTokens from "../helpers/tokens/getRemainingTokens.js";
import type * as helpers_tokens_getTokens from "../helpers/tokens/getTokens.js";
import type * as helpers_tokens_index from "../helpers/tokens/index.js";
import type * as helpers_tokens_saveDefaultTokens from "../helpers/tokens/saveDefaultTokens.js";
import type * as helpers_tokens_useTokens from "../helpers/tokens/useTokens.js";
import type * as helpers_users_getUserId from "../helpers/users/getUserId.js";
import type * as mutations_tokens from "../mutations/tokens.js";
import type * as queries_tokens from "../queries/tokens.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "helpers/tokens/getRemainingTokens": typeof helpers_tokens_getRemainingTokens;
  "helpers/tokens/getTokens": typeof helpers_tokens_getTokens;
  "helpers/tokens/index": typeof helpers_tokens_index;
  "helpers/tokens/saveDefaultTokens": typeof helpers_tokens_saveDefaultTokens;
  "helpers/tokens/useTokens": typeof helpers_tokens_useTokens;
  "helpers/users/getUserId": typeof helpers_users_getUserId;
  "mutations/tokens": typeof mutations_tokens;
  "queries/tokens": typeof queries_tokens;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
