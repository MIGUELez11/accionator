'use client';

import { useTranslate } from '@tolgee/react';
import { TranslationKey } from '@tolgee/web';
import { NavBarLink } from './components/NavBarLink';

const pages = {
  screener: {
    href: '/screener',
    labelKey: 'nav.screener',
  },
  plan: {
    href: '/plan',
    labelKey: 'nav.plan',
  },
  operations: {
    href: '/operations',
    labelKey: 'nav.operations',
  },
} satisfies Record<string, { href: string; labelKey: `nav.${string}` & TranslationKey }>;

export function NavBar() {
  const { t } = useTranslate();

  return (
    <div className="flex flex-row gap-6">
      {Object.entries(pages).map(([key, value]) => (
        <NavBarLink href={value.href} key={key}>
          {t(value.labelKey)}
        </NavBarLink>
      ))}
    </div>
  );
}
