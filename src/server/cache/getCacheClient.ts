import "server-only";

import { Redis } from "@upstash/redis";

let cacheClient: Redis | null = null;

export function getCacheClient() {
  if (!cacheClient) {
    cacheClient = Redis.fromEnv();
  }

  return cacheClient;
}
