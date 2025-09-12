import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: React.ReactNode;
  className?: string;
  subtitle?: React.ReactNode;
}

export function SectionHeader({ title, className, subtitle }: SectionHeaderProps) {
  return (
    <div className={cn('mb-5 flex flex-col', className)}>
      <h2 className={cn('relative font-bold tracking-tight text-primary drop-shadow-lg', 'text-2xl sm:text-3xl lg:text-4xl')}>{title}</h2>

      {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
