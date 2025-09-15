'use client';

import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useProducts } from '@/features/products/hooks/useProduct';
import SearchItem from './SearchItem';
import { cn } from '@/lib/utils';
import { Product } from '@/features/products/ProductType';

import { ScrollArea } from '@/components/ui/scroll-area';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebounce(searchInput.trim(), 500);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isFetching, isLoading } = useProducts({
    params: { page: 1, take: 10, search: debouncedSearch },
    enabled: !!debouncedSearch,
    staleTime: 5 * 60 * 1000,
  });

  const productItems: Product[] = data?.items || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-3xl flex-1">
      <div
        className={cn(
          'flex items-center rounded-lg border bg-background px-4 py-2 transition-all',
          isOpen ? 'border-primary shadow-md' : 'border-border',
        )}
      >
        <Search className={cn('h-6 w-6 text-muted-foreground flex-shrink-0', isOpen && 'text-primary')} />
        <input
          id="search"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          placeholder="جستجو کنید ..."
          className="flex w-[500px] bg-transparent border-none px-3 py-2 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0 text-text/90"
        />
      </div>

      {isOpen && debouncedSearch && (
        <div
          className={cn(
            'absolute inset-x-0 top-full z-50 w-full overflow-hidden rounded-b-lg border border-t-transparent bg-background shadow-lg',
          )}
        >
          <ScrollArea className="h-[400px] rounded-md border overflow-y-auto p-4">
            {isFetching && isLoading ? (
              <p className="text-center text-muted-foreground">در حال بارگذاری...</p>
            ) : productItems.length === 0 ? (
              <p className="text-center text-muted-foreground">نتیجه‌ای یافت نشد</p>
            ) : (
              <ul className="space-y-2">
                {productItems.map((product) => (
                  <SearchItem key={product.id} product={product} />
                ))}
              </ul>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
