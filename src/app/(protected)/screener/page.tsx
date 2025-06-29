'use client';

import { TitledSection } from '@/components/TitledSection';
import { screenerQuery } from '@/queries/screenerQuery';
import { Screeners } from '@/server/types';
import { useQuery } from '@tanstack/react-query';
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
  return (
    <TitledSection
      title="Descubre oportunidades de inversión"
      subtitle="Selecciona un screener para encontrar acciones con potencial de inversión a corto plazo"
    >
      <ScreenerPicker value={selectedScreener} onChange={setSelectedScreener} />
      {children}
    </TitledSection>
  );
}

export default function ScreenerPage() {
  const [selectedScreener, setSelectedScreener] = useState<Screeners | null>(null);
  const { data, isLoading, error } = useQuery(screenerQuery(selectedScreener));

  if (!selectedScreener) {
    return <Wrapper selectedScreener={selectedScreener} setSelectedScreener={setSelectedScreener} />;
  }

  if (selectedScreener && isLoading) {
    return (
      <Wrapper selectedScreener={selectedScreener} setSelectedScreener={setSelectedScreener}>
        <div>Loading...</div>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper selectedScreener={selectedScreener} setSelectedScreener={setSelectedScreener}>
        <div>Something went wrong</div>
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
