'use client';

import { Screeners } from '@/server/types';
import { ActivityIcon, BuildingIcon, PercentIcon, TrendingUpIcon } from 'lucide-react';
import { ScreenerType, ScreenerTypeProps } from './components/ScreenerType';

const screeners = {
  highVolatilityWithGrow: {
    title: 'Volatilidad con crecimiento',
    description: 'Acciones con volatilidad y crecimiento potencial',
    icon: TrendingUpIcon,
  },
  nasdaq100: {
    title: 'NASDAQ 100',
    description: 'Acciones de la NASDAQ 100',
    icon: BuildingIcon,
  },
  pennyHighBeta: {
    title: 'Penny stocks',
    description: 'Acciones de penny stocks con beta alta',
    icon: PercentIcon,
  },
  pennyStocksHighVolume: {
    title: 'Penny stocks con volumen',
    description: 'Acciones de penny stocks con volumen alto',
    icon: ActivityIcon,
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
