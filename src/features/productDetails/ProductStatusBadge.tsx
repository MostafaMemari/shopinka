import { cn } from '@/lib/utils';
import React from 'react';

interface ProductStatusBadgeProps {
  icon?: React.ReactNode;
  label: string | React.ReactNode;
  status?: string | React.ReactNode;
  className?: string;
}

export function ProductStatusBadge({ icon, label, status, className }: ProductStatusBadgeProps) {
  return (
    <li className={cn('flex items-center gap-x-2 text-sm', className)}>
      <span className="text-lg">{icon}</span>
      <span className="table-name lts-05">{label}</span>

      {status && (
        <>
          <span className="divider">|</span>

          <span className="table-flag lts-05 fs-9">{status}</span>
        </>
      )}
    </li>
  );
}
