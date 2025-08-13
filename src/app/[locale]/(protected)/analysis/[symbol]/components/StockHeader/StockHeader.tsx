import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Suspense } from 'react';
import { PriceDisplay } from './components/PriceDisplay';

export interface StockHeaderProps {
  symbol: string;
  name: string;
  logo: string;
}

export function StockHeader({ symbol, name, logo }: StockHeaderProps) {
  return (
    <div className="bg-white z-40 sticky top-16">
      <div className="flex flex-row gap-2 min-w-full justify-between p-4">
        <div className="flex flex-row gap-2 items-center">
          <Image src={logo} alt={name + ' logo'} className="w-12 h-12 rounded-sm" width={48} height={48} />
          <div className="flex flex-col justify-between content-center">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-500">{symbol}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Suspense
            fallback={
              <>
                <Skeleton className="w-24 h-8" />
                <Skeleton className="w-16 h-4" />
              </>
            }
          >
            <PriceDisplay symbol={symbol} />
          </Suspense>
        </div>
      </div>
      <Separator />
    </div>
  );
}
