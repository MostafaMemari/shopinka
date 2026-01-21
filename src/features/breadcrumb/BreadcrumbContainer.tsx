import React from 'react';
import BreadcrumbBoxed from './BreadcrumbBoxed';
import BreadcrumbCompact from './BreadcrumbCompact';
import { BreadcrumbItemType } from './breadcrumbTypes';

interface Props {
  items: BreadcrumbItemType[];
  variant?: 'boxed' | 'compact';
}

export default function BreadcrumbContainer({ items, variant = 'boxed' }: Props) {
  if (variant === 'boxed') return <BreadcrumbBoxed items={items} />;
  return <BreadcrumbCompact items={items} />;
}
