'use client';

import { DEFAULT_LANGUAGE } from '@/i18n/tolgee/shared';
import { enUS, esES } from '@clerk/localizations';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { useTolgee } from '@tolgee/react';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ReactNode } from 'react';

const localizations = {
  es: esES,
  en: enUS,
};

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file');
}

export const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const tolgee = useTolgee(['language']);
  const locale: keyof typeof localizations = (tolgee.getLanguage() as keyof typeof localizations) ?? DEFAULT_LANGUAGE;
  const localization = localizations[locale];

  return (
    <ClerkProvider localization={localization}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
