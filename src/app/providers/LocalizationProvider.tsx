import { getLanguage } from '@/i18n/tolgee/language';
import { getTolgee } from '@/i18n/tolgee/server';
import { PropsWithChildren } from 'react';
import { TolgeeNextProvider } from '../../i18n/tolgee/client';

export async function LocalizationProvider({ children }: PropsWithChildren) {
  const locale = await getLanguage();
  const tolgee = await getTolgee();

  const staticData = await tolgee.loadRequired();

  return (
    <TolgeeNextProvider language={locale} staticData={staticData}>
      {children}
    </TolgeeNextProvider>
  );
}
