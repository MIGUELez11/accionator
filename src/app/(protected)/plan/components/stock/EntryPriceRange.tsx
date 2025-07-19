'use client';

interface EntryPriceRangeProps {
  minPrice: number;
  maxPrice: number;
}

export function EntryPriceRange({ minPrice, maxPrice }: EntryPriceRangeProps) {
  return (
    <div className="flex items-center justify-center p-3 bg-muted/30 rounded-lg">
      <div className="flex flex-col items-center">
        <p className="text-xs text-muted-foreground">Rango de entrada</p>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold">${minPrice}</span>
          <span className="text-muted-foreground">-</span>
          <span className="text-xl font-bold">${maxPrice}</span>
        </div>
      </div>
    </div>
  );
}
