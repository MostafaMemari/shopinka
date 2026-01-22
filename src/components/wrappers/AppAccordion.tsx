import React from 'react';
import { Accordion as AccordionShadcn, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export interface AccordionData {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

interface Props {
  items: AccordionData[];
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  className?: string;
}

export function AppAccordion({ items, type = 'single', collapsible = true, className }: Props) {
  return (
    <AccordionShadcn
      type={type}
      collapsible={collapsible}
      className={`w-full rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} className="border-b py-2 last:border-b-0">
          <AccordionTrigger
            className="
              flex w-full items-center justify-between 
              px-4 py-3 text-right text-sm sm:text-base font-medium
              transition-all hover:bg-gray-50
              cursor-pointer
            "
          >
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent
            className="
              px-4 pb-4 pt-2 text-gray-600 text-sm sm:text-base leading-relaxed
              animate-in fade-in slide-in-from-top-1
            "
          >
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionShadcn>
  );
}
