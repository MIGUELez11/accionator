import { Separator } from '@/components/ui/separator';
import { GlobeIcon, MapPinIcon } from 'lucide-react';
import { EconomicIndicator } from './EconomicIndicator';
import { InfoCard } from './InfoCard';

export interface BussinessInfoProps {
  exchange: string;
  sector: string;
  capitalization: number;
  currency: string;
  website: string;
  country: string;
}

function getCapitalization(capitalization: number) {
  if (capitalization > 1e12) {
    return (capitalization / 1e12).toFixed(2).toLocaleString() + 'T';
  }
  if (capitalization > 1e9) {
    return (capitalization / 1e9).toFixed(2).toLocaleString() + 'B';
  }
  if (capitalization > 1e6) {
    return (capitalization / 1e6).toFixed(2).toLocaleString() + 'M';
  }
  if (capitalization > 1e3) {
    return (capitalization / 1e3).toFixed(2).toLocaleString() + 'K';
  }

  return capitalization.toFixed(2).toLocaleString();
}

export function BussinessInfo({ exchange, sector, capitalization, currency, website, country }: BussinessInfoProps) {
  return (
    <InfoCard title="Bussiness Info" className="h-[264px] overflow-hidden pb-0">
      <div className="grid grid-cols-2 gap-4 px-6">
        <EconomicIndicator title="Exchange" value={exchange} />
        <EconomicIndicator title="Sector" value={sector} />
        <EconomicIndicator title="Capitalization" value={`$${getCapitalization(capitalization)}`} />
        <EconomicIndicator title="Currency" value={currency} />
      </div>
      <div className="h-full">
        <Separator />
        <div className="flex flex-row gap-4 items-center min-h-full px-6">
          <div className="flex flex-row gap-2 items-center">
            <GlobeIcon className="w-4 h-4" />
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500">
              {website}
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
