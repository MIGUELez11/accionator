import { isServer } from '@tanstack/react-query';

export function callNextApi<T>(url: string, options: RequestInit = {}): () => Promise<T> {
  return () => {
    if (isServer) {
      console.error("You can't call src/lib/callNextApi on the server");
      throw new Error("You can't call src/lib/callNextApi on the server");
    }

    return fetch(url, options).then(async (res) => {
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
