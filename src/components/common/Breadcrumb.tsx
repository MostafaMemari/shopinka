import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
  Breadcrumb as BreadcrumbShadcn,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

interface Props {
  items: { label: string; href: string }[];
  variant?: 'boxed' | 'compact';
}

const BreadcrumbContainer = ({ items, variant = 'boxed' }: Props) => {
  if (variant === 'boxed') {
    return (
      <Card className="w-fit px-4 py-4">
        <BreadcrumbShadcn>
          <BreadcrumbList className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className="text-sm text-text/90 hover:underline">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < items.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronLeft className="h-5 w-5 text-text/90" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </BreadcrumbShadcn>
      </Card>
    );
  }

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
};

export default BreadcrumbContainer;
