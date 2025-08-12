'use client';

import { CachePublicRecord, TolgeeProvider, TolgeeStaticData } from '@tolgee/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TolgeeBase } from '../../i18n/tolgee/shared';

type Props = {
  language: string;
  staticData: TolgeeStaticData | CachePublicRecord[];
  children: React.ReactNode;
};

const tolgee = TolgeeBase().init();

export const TolgeeNextProvider = ({ language, staticData, children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    // this ensures server components refresh, after translation change
    const { unsubscribe } = tolgee.on('permanentChange', () => {
      router.refresh();
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <TolgeeProvider tolgee={tolgee} fallback="Loading" ssr={{ language, staticData }}>
      {children}
    </TolgeeProvider>
  );
};
