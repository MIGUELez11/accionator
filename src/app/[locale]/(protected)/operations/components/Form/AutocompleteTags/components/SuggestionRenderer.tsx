import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import type { useAutocompleteTags } from '../hooks/useAutocompleteTags';

type Tag = NonNullable<ReturnType<typeof useAutocompleteTags>['tagsWithSearch']>[number];

export function SuggestionRenderer({ suggestion }: { suggestion: Tag }) {
  return (
    <div
      className={cn('flex items-center gap-2', {
        'text-muted-foreground': suggestion.disabled,
        'cursor-not-allowed': suggestion.disabled,
      })}
    >
      {suggestion.isSearch ? <PlusIcon className="w-4 h-4" /> : null}
      <span className="line-clamp-2">{suggestion.label}</span>
    </div>
  );
}
