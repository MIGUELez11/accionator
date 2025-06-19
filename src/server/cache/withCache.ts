import { getCache } from "./getCache";
import { setCache } from "./setCache";

export async function withCache(
  key: string,
  ttl: number = 60 * 60 * 24,
  fn: () => Promise<any>
) {
  const cached = await getCache(key);

  if (cached) {
    return cached;
  }

  const result = await fn();
  await setCache(key, result, ttl);

  return result;
}
