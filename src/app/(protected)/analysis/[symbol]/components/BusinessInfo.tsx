'use client';

import { Separator } from '@/components/ui/separator';
import { stockInfoQuery } from '@/queries/stockInfoQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslate } from '@tolgee/react';
import { GlobeIcon, MapPinIcon } from 'lucide-react';
import { EconomicIndicator } from '../../../../../components/EconomicIndicator';
import { InfoCard } from '../../../../../components/InfoCard';

export interface BusinessInfoProps {
  exchange: string;
  sector: string;
  capitalization: number;
  currency: string;
  website: string;
  country: string;
}

function getCapitalization(capitalization: number) {
  if (capitalization > 1e12) {
    return (capitalization / 1e12).toFixed(2) + 'T';
  }
  if (capitalization > 1e9) {
    return (capitalization / 1e9).toFixed(2) + 'B';
  }
  if (capitalization > 1e6) {
    return (capitalization / 1e6).toFixed(2) + 'M';
  }
  if (capitalization > 1e3) {
    return (capitalization / 1e3).toFixed(2) + 'K';
  }

  return capitalization.toFixed(2);
}

export function BusinessInfo({ symbol }: { symbol: string }) {
  const { data: stockProfile } = useSuspenseQuery({ ...stockInfoQuery(symbol), select: (data) => data.stockProfile });
  const { exchange, finnhubIndustry, marketCapitalization, currency, weburl, country } = stockProfile;
  const { t } = useTranslate();

  return (
    <InfoCard title={t('page.analysis.businessInfo.title')} className="h-[264px] overflow-hidden pb-0">
      <div className="grid grid-cols-2 gap-4 px-6">
        <EconomicIndicator title={t('page.analysis.businessInfo.exchange')} value={exchange!} />
        <EconomicIndicator title={t('page.analysis.businessInfo.sector')} value={finnhubIndustry!} />
        <EconomicIndicator
          title={t('page.analysis.businessInfo.capitalization')}
          value={`$${getCapitalization(marketCapitalization!)}`}
        />
        <EconomicIndicator title={t('page.analysis.businessInfo.currency')} value={currency!} />
      </div>
      <div className="h-full">
        <Separator />
        <div className="flex flex-row gap-4 items-center min-h-full px-6">
          <div className="flex flex-row gap-2 items-center">
            <GlobeIcon className="w-4 h-4" />
            <a href={weburl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500">
              {weburl}
            </a>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <MapPinIcon className="w-4 h-4" />
            <p className="text-sm text-gray-500">{country}</p>
          </div>
        </div>
      </div>
    </InfoCard>
  );
}
