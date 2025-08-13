'use client';

import { TitledSection } from '@/components/TitledSection';
import { screenerQuery } from '@/queries/screenerQuery';
import { Screeners } from '@/server/types';
import { useQuery } from '@tanstack/react-query';
import { useTranslate } from '@tolgee/react';
import { useState } from 'react';
import { ScreenerPicker } from './components/ScreenerPicker/ScreenerPicker';
import { ScreenerTable } from './components/ScreenerTable';

function Wrapper({
  children,
  selectedScreener,
  setSelectedScreener,
}: {
  children?: React.ReactNode;
  selectedScreener: Screeners | null;
  setSelectedScreener: (screener: Screeners) => void;
}) {
  const { t } = useTranslate();
  return (
    <TitledSection title={t('page.screener.title')} subtitle={t('page.screener.subtitle')}>
      <ScreenerPicker value={selectedScreener} onChange={setSelectedScreener} />
      {children}
    </TitledSection>
  );
}

export default function ScreenerPage() {
  const [selectedScreener, setSelectedScreener] = useState<Screeners | null>(null);
  const { data, isLoading, error } = useQuery(screenerQuery(selectedScreener));
  const { t } = useTranslate();

  if (!selectedScreener) {
    return <Wrapper selectedScreener={selectedScreener} setSelectedScreener={setSelectedScreener} />;
  }

  if (selectedScreener && isLoading) {
    return (
      <Wrapper selectedScreener={selectedScreener} setSelectedScreener={setSelectedScreener}>
        <div>{t('component.common.loading')}</div>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper selectedScreener={selectedScreener} setSelectedScreener={setSelectedScreener}>
        <div>{t('component.common.somethingWentWrong')}</div>
      </Wrapper>
    );
  }

  if (selectedScreener && !isLoading && !error && data) {
    return (
      <Wrapper selectedScreener={selectedScreener} setSelectedScreener={setSelectedScreener}>
        <ScreenerTable data={data} />
      </Wrapper>
    );
  }
}
