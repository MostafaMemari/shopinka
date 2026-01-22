import Link from 'next/link';
import {
  Breadcrumb as BreadcrumbShadcn,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { BreadcrumbItemType } from '../breadcrumbTypes';

interface Props {
  items: BreadcrumbItemType[];
}

export default function BreadcrumbCompact({ items }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <BreadcrumbShadcn>
        <BreadcrumbList className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem className="text-sm font-light text-primary sm:text-base">
                <BreadcrumbLink asChild>
                  <Link href={item.href} className="text-sm text-text/90 hover:underline">
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < items.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronLeft className="h-5 w-5" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </BreadcrumbShadcn>
    </div>
  );
}
