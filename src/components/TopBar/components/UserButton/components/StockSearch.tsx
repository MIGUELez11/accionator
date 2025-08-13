'use client';

import { Autocomplete } from '@/components/ui/autocomplete';
import { useDeferedValue } from '@/hooks/useDeferedValue';
import { searchSymbolQuery } from '@/queries/searchSymbolQuery';
import { SymbolSearchResponse } from '@/server/stocks/clients/getFinancialmodelingprepClient';
import { useQuery } from '@tanstack/react-query';
import { useTranslate } from '@tolgee/react';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function StockSearchRenderComponent({ suggestion: symbol }: { suggestion: SymbolSearchResponse & { id: string } }) {
  return (
    <div className="flex items-center gap-1">
      <p className="font-bold">{symbol.symbol}</p>
      <p className="line-clamp-1 text-foreground text-sm">{symbol.name}</p>
    </div>
  );
}

export function StockSearch() {
  const router = useRouter();
  const { t } = useTranslate();

  const [query, setQuery] = useState('');

  const deferedQuery = useDeferedValue(query, 500);
  const { data, isLoading } = useQuery({
    ...searchSymbolQuery(deferedQuery),
    select: (data) =>
      data.map((item) => ({
        id: item.symbol,
        ...item,
      })),
  });

  return (
    <div className="w-64">
      <Autocomplete
        leftIcon={SearchIcon}
        placeholder={t('component.stockSearch.placeholder')}
        searchValue={query}
        onSearchValueChange={setQuery}
        suggestions={data}
        renderComponent={StockSearchRenderComponent}
        isSearching={isLoading}
        maxWidth={256}
        onSelectedValueChange={(value, onClose) => {
          router.prefetch(`/analysis/${value.symbol}`);
          router.push(`/analysis/${value.symbol}`);
          onClose();
        }}
      />
    </div>
  );
}
