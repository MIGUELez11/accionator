import { API_ROUTES, API_ROUTES_QUERY, API_ROUTES_RESPONSE, API_ROUTES_URLS } from '@/app/api/apiRoutes';
import { isServer } from '@tanstack/react-query';

type Options<TQuery> = RequestInit & { query: TQuery extends undefined ? undefined : TQuery };

export function callNextApi<
  TRoute extends keyof typeof API_ROUTES,
  TQuery extends API_ROUTES_QUERY[TRoute],
  TResponse extends API_ROUTES_RESPONSE[TRoute],
>(url: TRoute, options: Options<TQuery> = {} as Options<TQuery>): () => Promise<TResponse> {
  return () => {
    if (isServer) {
      console.error("You can't call src/lib/callNextApi on the server");
      throw new Error("You can't call src/lib/callNextApi on the server");
    }

    const query = new URLSearchParams();
    if (options.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        query.set(key, value);
      });
    }

    return fetch(`${API_ROUTES_URLS[url]}?${query.toString()}`, options).then(async (res) => {
      if (!res.ok) {
        let error: Error | undefined;

        try {
          const body = await res.json();

          if (body.error) {
            error = new Error(body.error);
          } else {
            error = new Error(`An unknown error occurred: ${res.statusText}`);
          }
        } catch (e) {
          error = new Error(`An unknown error occurred: ${res.statusText}`, { cause: e });
        }

        if (error) {
          throw error;
        }
      }

      return res.json();
    });
  };
}
