'use client';

import { Badge } from '@/components/ui/badge';
import { handleOnKeyboardClick } from '@/lib/handleOnKeyboardClick';

interface SelectedTagsProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

function Tag({ tag, onRemove }: { tag: string; onRemove: (tag: string) => void }) {
  return (
    <Badge
      variant="outline"
      className="bg-gray-100 text-gray-800 cursor-pointer"
      onClick={() => onRemove(tag)}
      onKeyDown={handleOnKeyboardClick(() => onRemove(tag))}
      role="button"
      tabIndex={0}
      aria-label={`Remove tag ${tag}`}
    >
      {tag}
    </Badge>
  );
}

export function SelectedTags({ tags, onChange }: SelectedTagsProps) {
  return (
    <div className="flex flex-row gap-2 overflow-x-auto pb-2">
      {tags.map((tag: string) => (
        <Tag key={tag} tag={tag} onRemove={(tag) => onChange(tags.filter((t) => t !== tag))} />
      ))}
    </div>
  );
}
