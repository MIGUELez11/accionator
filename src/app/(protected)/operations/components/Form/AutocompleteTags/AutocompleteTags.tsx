'use client';

import { Autocomplete } from '@/components/ui/autocomplete';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useElementSize } from '@/hooks/useResizeObserver';
import { useFormContext, useWatch } from 'react-hook-form';
import { SelectedTags } from './components/SelectedTags';
import { SuggestionRenderer } from './components/SuggestionRenderer';
import { useAutocompleteTags } from './hooks/useAutocompleteTags';

interface AutocompleteTagsProps {
  name: string;
}

export function AutocompleteTags({ name }: AutocompleteTagsProps) {
  const form = useFormContext();
  const tags = useWatch({ control: form.control, name: name });

  const [resizeObserverRef, { width: maxWidth }] = useElementSize();
  const { onSearchChange, tagsWithSearch, isFetching } = useAutocompleteTags(tags);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem ref={resizeObserverRef}>
          <FormLabel>Etiquetas</FormLabel>
          <FormControl>
            <Autocomplete
              maxWidth={maxWidth}
              suggestions={tagsWithSearch}
              onSelectedValueChange={(value) => {
                if (value.disabled) {
                  return;
                }

                field.onChange([...field.value, value.label]);
              }}
              onSearchValueChange={onSearchChange}
              renderComponent={SuggestionRenderer}
              isSearching={isFetching}
            />
          </FormControl>
          <FormMessage />

          <SelectedTags tags={field.value} onChange={field.onChange} />
        </FormItem>
      )}
    />
  );
}
