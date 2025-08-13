import { DEFAULT_LANGUAGE } from '@/i18n/tolgee/shared';
import { useTolgee } from '@tolgee/react';

export function useLocale() {
  const tolgee = useTolgee(['language']);
  const locale = tolgee.getLanguage() ?? DEFAULT_LANGUAGE;

  return locale;
}
