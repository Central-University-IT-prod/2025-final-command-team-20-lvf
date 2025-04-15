import { useEffect, useState } from 'react';
import { SearchSuggestionType } from "../types";
import { fetchSearchSuggestions } from "../util/fetchSearchSuggestions";
import { useDebouncedCallback } from "./useDebouncedCallback";

export function useSearch(query: string) {
  const [suggestions, setSuggestions] = useState<SearchSuggestionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateSuggestions = useDebouncedCallback(
    async (searchQuery: string) => {
      setIsLoading(true);
      try {
        const result = await fetchSearchSuggestions(searchQuery);
        setSuggestions(result);
      } finally {
        setIsLoading(false);
      }
    },
    300,
    false,
  );

  useEffect(() => {
    if (query.trim()) {
      updateSuggestions(query);
    } else {
      setSuggestions([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return {
    suggestions,
    isLoading,
  };
}
