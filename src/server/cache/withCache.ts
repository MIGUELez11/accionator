import { getCache } from "./getCache";
import { setCache } from "./setCache";

export async function withCache<T>(
  key: string,
  ttl: number = 60 * 60 * 24,
  fn: () => Promise<T>
): Promise<T> {
  const cached = await getCache(key);

  if (cached) {
    return cached as T;
  }

  const result = await fn();
  await setCache(key, result, ttl);

  return result;
}
