'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface StockHeaderProps {
  symbol: string;
  name: string;
  ticker: string;
  logo?: string;
  price: number;
  percentChange?: number;
}

export function StockHeader({ symbol, name, ticker, logo, price, percentChange }: StockHeaderProps) {
  return (
    <header className="flex gap-2 justify-between">
      <div className="flex items-center gap-2">
        {logo ? (
          <Image src={logo} alt={name ?? symbol} width={48} height={48} />
        ) : (
          <div className="w-10 h-10 bg-muted rounded-full" />
        )}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold line-clamp-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{ticker}</p>
        </div>
      </div>
      <div className="flex justify-center items-end flex-col">
        <p className="text-lg font-bold">${price}</p>
        <p
          className={cn({
            'text-green-500': percentChange && percentChange > 0,
            'text-red-500': percentChange && percentChange < 0,
            'text-muted-foreground': !percentChange,
          })}
        >
          {percentChange?.toFixed(2)}%
        </p>
      </div>
    </header>
  );
}
