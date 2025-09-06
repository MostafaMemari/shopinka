'use client';

import * as React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FaqItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  category: string;
  items: FaqItem[];
}

const FaqAccordion: React.FC<AccordionProps> = ({ category, items }) => {
  return (
    <div>
      {/* Title */}
      <div className="mb-4 flex items-center gap-x-3">
        <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
        <p className="text-lg sm:text-xl font-semibold text-gray-800">{category}</p>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="w-full space-y-2">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg shadow-sm">
            <AccordionTrigger className="px-4 sm:px-6 text-right text-sm sm:text-base font-medium text-gray-700">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-600 bg-gray-50/50">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqAccordion;
