'use client';

import { Screeners } from '@/server/types';
import { useTranslate } from '@tolgee/react';
import { ActivityIcon, BuildingIcon, PercentIcon, TrendingUpIcon } from 'lucide-react';
import { ScreenerType, ScreenerTypeProps } from './components/ScreenerType';

function useLocalizedScreeners(): Record<Screeners, ScreenerTypeProps> {
  const { t } = useTranslate();
  return {
    highVolatilityWithGrow: {
      title: t('view.screenerPicker.highVolatilityWithGrow.title'),
      description: t('view.screenerPicker.highVolatilityWithGrow.description'),
      icon: TrendingUpIcon,
    },
    nasdaq100: {
      title: t('view.screenerPicker.nasdaq100.title'),
      description: t('view.screenerPicker.nasdaq100.description'),
      icon: BuildingIcon,
    },
    pennyHighBeta: {
      title: t('view.screenerPicker.pennyHighBeta.title'),
      description: t('view.screenerPicker.pennyHighBeta.description'),
      icon: PercentIcon,
    },
    pennyStocksHighVolume: {
      title: t('view.screenerPicker.pennyStocksHighVolume.title'),
      description: t('view.screenerPicker.pennyStocksHighVolume.description'),
      icon: ActivityIcon,
    },
  } as const satisfies Record<Screeners, ScreenerTypeProps>;
}

export function ScreenerPicker({
  value: selectedScreener,
  onChange,
}: {
  value: string | null;
  onChange: (screener: Screeners) => void;
}) {
  const screeners = useLocalizedScreeners();

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
