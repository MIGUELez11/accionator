import { getCacheClient } from "./getCacheClient";

export function setCache<T>(key: string, value: T, ttl: number = 60 * 60 * 24) {
  const client = getCacheClient();

  return client.set(key, value, { ex: ttl }).catch((e) => {
    throw new Error(`Error setting cache: ${e.message}`, { cause: e });
  });
}
