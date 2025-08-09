import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

interface SelectedTagsProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

function Tag({ tag, onRemove }: { tag: string; onRemove: (tag: string) => void }) {
  return (
    <div key={tag} className="flex flex-row items-center gap-2 bg-gray-100 rounded-lg pr-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 hover:bg-gray-200 rounded-lg cursor-pointer"
        onClick={() => onRemove(tag)}
      >
        <XIcon className="w-3 h-3" />
      </Button>
      <span title={tag} className="line-clamp-1 text-sm">
        {tag}
      </span>
    </div>
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
