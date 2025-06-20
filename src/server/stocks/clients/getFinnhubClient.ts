import "server-only";
import { DefaultApi } from "finnhub-ts";

export function getFinnhubClient() {
  if (!process.env.FINNHUB_API_KEY) {
    throw new Error("FINNHUB_API_KEY is not set");
  }

  return new DefaultApi({
    apiKey: process.env.FINNHUB_API_KEY,
    isJsonMime: (input) => {
      try {
        JSON.parse(input);
        return true;
      } catch {
        return false;
      }
    },
  });
}
