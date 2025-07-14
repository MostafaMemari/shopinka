'use client';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';

export const useResetPageOnQueryChange = (trigger: boolean | string | number) => {
  const [page, setPage] = useQueryState('page', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });

  useEffect(() => {
    if (page !== null && page !== '') {
      setPage(null);
    }
  }, [trigger]);
};
