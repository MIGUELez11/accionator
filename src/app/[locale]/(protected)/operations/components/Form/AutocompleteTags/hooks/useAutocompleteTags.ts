import { convexQuery } from "@convex-dev/react-query";
import { api } from "@convex/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useDeferredValue, useMemo, useState } from "react";

export function useAutocompleteTags(selectedTags: string[]) {
  const [searchValue, setSearchValue] = useState('');
  const deferedSearchValue = useDeferredValue(searchValue);

  const onSearchChange = useCallback((value: string) => {
    setSearchValue(value.trim());
  }, []);

  const { data: tags, isFetching } = useQuery({
    ...convexQuery(api.queries.tags.list, {
      query: deferedSearchValue,
    }),
    select: (data) => data.map((tag) => ({ id: tag.tag, label: tag.tag, isSearch: false, disabled: false })),
  });

  const tagsWithoutSelected = useMemo(() => {
    return tags?.map((tag) => ({ ...tag, disabled: selectedTags.includes(tag.label) })) ?? [];
  }, [tags, selectedTags]);

  const tagsWithSearch = useMemo(() => {
    const tagsIncludesSearch = tagsWithoutSelected?.filter((tag) => tag.label.toLowerCase() === searchValue.toLowerCase())?.length;

    if (tagsIncludesSearch || !searchValue) {
      return tagsWithoutSelected;
    }

    const selectedTagsIncludesSearch = !!selectedTags.some((tag) => tag.toLowerCase() === searchValue.toLowerCase());

    return [{ id: 'search', label: searchValue, isSearch: true, disabled: selectedTagsIncludesSearch }, ...(tagsWithoutSelected ?? [])];
  }, [tagsWithoutSelected, searchValue, selectedTags]);

  return { onSearchChange, tagsWithSearch, searchValue, tags, isFetching };
}