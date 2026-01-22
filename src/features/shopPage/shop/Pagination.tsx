'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { FC, useMemo } from 'react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  totalPages: number;
}

const Pagination: FC<PaginationProps> = ({ totalPages }) => {
  const [queryPage, setQueryPage] = useQueryState('page', {
    defaultValue: '1',
    history: 'replace',
    shallow: false,
  });

  const currentPage = Number(queryPage) || 1;
  const maxPagesToShow = 3;

  const pages = useMemo(() => {
    const result: (number | { type: 'ellipsis'; id: string })[] = [];

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) result.push(i);
      return result;
    }

    result.push(1);

    if (currentPage > 3) {
      result.push({ type: 'ellipsis', id: 'start' });
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      result.push(i);
    }

    if (currentPage < totalPages - 2) {
      result.push({ type: 'ellipsis', id: 'end' });
    }

    result.push(totalPages);

    return result;
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setQueryPage(String(page));
  };

  return (
    <div className="flex items-center justify-center gap-2 md:justify-end">
      <Button variant="outline" size="icon" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="h-8 w-8">
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((page) =>
          typeof page === 'number' ? (
            <Button
              key={`page-${page}`}
              variant={page === currentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => goToPage(page)}
              className="h-8 w-8"
            >
              {page}
            </Button>
          ) : (
            <span key={`ellipsis-${page.id}`} className="text-sm text-muted-foreground">
              ...
            </span>
          ),
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Pagination;
