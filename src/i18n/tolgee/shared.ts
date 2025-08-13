import { FormatIcu } from '@tolgee/format-icu';
import { BackendFetch, DevTools, LanguageDetector, Tolgee } from '@tolgee/web';

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;

export const ALL_LANGUAGES = ['es', 'en'] as const;
export type ALL_LANGUAGES = (typeof ALL_LANGUAGES)[number];

export const DEFAULT_LANGUAGE = 'es' satisfies (typeof ALL_LANGUAGES)[number];

export function TolgeeBase() {
  return Tolgee()
    .use(FormatIcu())
    .use(DevTools())
    .use(LanguageDetector())
    .use(BackendFetch({ fallbackOnFail: true }))
    .updateDefaults({
      apiKey,
      apiUrl,
      staticData: {
        en: () => import('../en.json'),
        es: () => import('../es.json'),
      },
    });
}
