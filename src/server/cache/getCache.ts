import { getCacheClient } from "./getCacheClient";

export function getCache(key: string) {
  const client = getCacheClient();
  const value = client.get(key).catch((e) => {
    throw new Error(`Error getting cache: ${e.message}`, { cause: e });
  });

  return value;
}
