import { getTranslate } from '@/i18n/tolgee/server';
import { TranslationKey } from '@tolgee/react';
import { BrainIcon, ChartNoAxesColumnIcon, ClockIcon } from 'lucide-react';
import React from 'react';
import { FeatureCard } from './FeatureCard';

interface Feature {
  title: `page.home.features.${string}.title` & TranslationKey;
  description: `page.home.features.${string}.description` & TranslationKey;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: 'page.home.features.advancedScreener.title',
    description: 'page.home.features.advancedScreener.description',
    icon: <ChartNoAxesColumnIcon className="w-8 h-8 text-black" />,
  },
  {
    title: 'page.home.features.aiAnalysis.title',
    description: 'page.home.features.aiAnalysis.description',
    icon: <BrainIcon className="w-8 h-8 text-black" />,
  },
  {
    title: 'page.home.features.realTimeData.title',
    description: 'page.home.features.realTimeData.description',
    icon: <ClockIcon className="w-8 h-8 text-black" />,
  },
];

export async function Features() {
  const t = await getTranslate();

  return (
    <div className="bg-gray-50 py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">{t('page.home.features.title')}</h2>
      <div className="flex flex-row justify-between gap-8 w-full">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={t(feature.title)}
            description={t(feature.description)}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
}
