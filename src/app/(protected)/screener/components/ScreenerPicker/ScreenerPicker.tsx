'use client';

import { Screeners } from '@/server/types';
import { ActivityIcon, BuildingIcon, SproutIcon, TrendingUpIcon } from 'lucide-react';
import { ScreenerType, ScreenerTypeProps } from './components/ScreenerType';

const screeners = {
  highVolumeMovers: {
    title: 'Movimientos de alto volumen',
    description: 'Acciones con volumen significativo y movimientos notables',
    icon: TrendingUpIcon,
  },
  highVolatilityPotential: {
    title: 'Potencial de volatilidad',
    description: 'Oportunidades en acciones con alta volatilidad',
    icon: ActivityIcon,
  },
  valueGrowthCandidates: {
    title: 'Candidatos de crecimiento',
    description: 'Acciones con potencial de crecimiento sostenible',
    icon: SproutIcon,
  },
  largeCapLiquidity: {
    title: 'Liquidez de gran capitalización',
    description: 'Empresas establecidas con alta liquidez en el mercado',
    icon: BuildingIcon,
  },
} as const satisfies Record<Screeners, ScreenerTypeProps>;

export function ScreenerPicker({
  value: selectedScreener,
  onChange,
}: {
  value: string | null;
  onChange: (screener: Screeners) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(screeners).map(([key, value]) => (
        <ScreenerType
          key={key}
          title={value.title}
          description={value.description}
          icon={value.icon}
          selected={selectedScreener === key}
          onClick={() => {
            onChange?.(key as Screeners);
          }}
        />
      ))}
    </div>
  );
}
