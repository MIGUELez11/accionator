import { cn } from '@/lib/utils';
import { PopoverContent } from '@radix-ui/react-popover';
import { Command as CommandPrimitive } from 'cmdk';
import { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from './command';
import { Input, InputProps } from './input';
import { Popover, PopoverAnchor } from './popover';

function DefaultRenderComponent<T extends { label: string }>({ suggestion }: { suggestion: T }) {
  return <span className="line-clamp-2">{suggestion.label}</span>;
}

interface AutocompleteProps<T, R> extends Pick<InputProps, 'placeholder' | 'leftIcon' | 'rightIcon'> {
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;

  selectedValue?: T;
  onSelectedValueChange?: (value: T, onClose: () => void) => void;

  suggestions?: T extends { id: string } ? T[] : never;
  isSearching?: boolean;

  maxWidth?: number;
  renderComponent?: R;
}

export function Autocomplete<T = { id: string; label: string }, R = (suggestion: T) => React.ReactNode>({
  placeholder,
  leftIcon,
  rightIcon,

  searchValue,
  onSearchValueChange,
  onSelectedValueChange,
  suggestions,
  isSearching,
  maxWidth,
  renderComponent: RenderComponent = DefaultRenderComponent as R,
}: AutocompleteProps<T, R>) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false}>
        <PopoverAnchor asChild>
          <CommandPrimitive.Input
            asChild
            value={searchValue}
            onValueChange={onSearchValueChange}
            onKeyDown={(e) => setOpen(e.key !== 'Escape')}
            onMouseDown={() => setOpen((open) => !!searchValue || !open)}
            onFocus={() => setOpen(true)}
            width={maxWidth}
          >
            <Input leftIcon={leftIcon} rightIcon={rightIcon} placeholder={placeholder} />
          </CommandPrimitive.Input>
        </PopoverAnchor>
        <PopoverContent
          className="w-full"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            if (e.target instanceof Element && e.target.hasAttribute('cmdk-input')) {
              e.preventDefault();
            }
          }}
        >
          <CommandList
            className="max-h-[300px] w-full overflow-y-auto bg-background border border-border rounded-md"
            style={{ width: maxWidth }}
          >
            {isSearching ? <CommandEmpty>Searching...</CommandEmpty> : <CommandEmpty>No results found</CommandEmpty>}
            <CommandGroup>
              {suggestions?.map((suggestion) => (
                <CommandItem
                  key={suggestion.id}
                  value={suggestion.id}
                  className={cn('cursor-pointer', {
                    'cursor-not-allowed': 'disabled' in suggestion && suggestion.disabled,
                  })}
                  onSelect={() => onSelectedValueChange?.(suggestion, () => setOpen(false))}
                >
                  {typeof RenderComponent === 'function' ? RenderComponent({ suggestion }) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
}
