import type es from '../es.json';

declare module '@tolgee/web' {
  type TranslationsType = typeof es;

  // ensures that nested keys are accessible with "."
  type DotNotationEntries<T> = T extends object
    ? {
        [K in keyof T]: `${K & string}${T[K] extends undefined
          ? ''
          : T[K] extends object
            ? `.${DotNotationEntries<T[K]>}`
            : ''}`;
      }[keyof T]
    : '';

  export type TranslationKey = DotNotationEntries<TranslationsType>;
}
