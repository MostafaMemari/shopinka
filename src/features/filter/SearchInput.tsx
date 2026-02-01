'use client';

import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface SearchInputProps {
  queryKey?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  autoFocus?: boolean;
}

const SearchInput = ({
  queryKey = 'search',
  placeholder = 'جستجو...',
  label = 'جستجو',
  className = '',
  wrapperClassName = '',
  autoFocus = false,
}: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useQueryState(queryKey, { defaultValue: '', history: 'replace', shallow: false });

  const [, setPage] = useQueryState('page', { defaultValue: '1', history: 'replace', shallow: false });

  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage('1');
    setSearchQuery(value);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <Card className={`relative w-full p-0 ${wrapperClassName}`}>
      <Label className="sr-only">{label}</Label>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text/60 text-lg pointer-events-none" />
      <input
        className={`w-full border-none py-4 pr-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0 ${className}`}
        placeholder={placeholder}
        type="text"
        value={inputValue}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
    </Card>
  );
};

export default SearchInput;
