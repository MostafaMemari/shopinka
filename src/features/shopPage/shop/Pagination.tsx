'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const [_, setQueryPage] = useQueryState('page', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });

  const maxPagesToShow = 3;
  const pages: (number | { type: 'ellipsis'; id: string })[] = [];

  if (totalPages <= maxPagesToShow + 2) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) {
      pages.push({ type: 'ellipsis', id: 'start' });
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push({ type: 'ellipsis', id: 'end' });
    }

    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 md:justify-end">
      <Button
        variant="outline"
        size="icon"
        onClick={() => currentPage > 1 && setQueryPage(String(currentPage - 1))}
        disabled={currentPage === 1}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <Button
              key={`page-${page}`}
              variant={page === currentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => setQueryPage(String(page))}
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
        onClick={() => currentPage < totalPages && setQueryPage(String(currentPage + 1))}
        disabled={currentPage === totalPages}
        className="h-8 w-8"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Pagination;
