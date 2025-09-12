import React from 'react';
import { Accordion as AccordionShadcn, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export interface AccordionData {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionData[];
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  className?: string;
}

export function Accordion({ items, type = 'single', collapsible = true, className }: AccordionProps) {
  return (
    <AccordionShadcn type={type} collapsible={collapsible} className={className}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionShadcn>
  );
}
