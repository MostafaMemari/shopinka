'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { faqData } from '@/data/faqData';
import { Search } from 'lucide-react';
import { Accordion } from '@/components/common/Accordion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SectionHeader } from '@/components/common/SectionHeader';

function Page() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredFaqData = faqData
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) || item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center mb-5">
        <SectionHeader title="تماس با ما" />

        <p className="text-sm sm:text-base text-gray-600">
          سوال خود را پیدا نکردید؟{' '}
          <Link href="/contact" className="text-primary font-medium transition-colors">
            با ما تماس بگیرید
          </Link>
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <p className="mb-4 text-sm sm:text-base text-gray-600">سوال خود را جستجو کنید</p>
              <div className="flex items-center rounded-lg bg-white border border-gray-200 px-3 py-2 shadow-sm">
                <Search className="h-5 w-5 text-gray-500" />
                <label className="sr-only">جستجوی سوالات متداول</label>
                <input
                  className="focus:ring-none focus:border-none block w-full rounded-md border-0 bg-transparent px-3 py-2 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  placeholder="دنبال چه سوالی می‌گردید؟"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            {filteredFaqData.length > 0 ? (
              filteredFaqData.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="font-bold text-lg">{section.category}</h2>

                  <Accordion
                    items={section.items.map((item, idx) => ({
                      value: `${section.category}-${idx}`,
                      trigger: item.question,
                      content: item.answer,
                    }))}
                  />
                </div>
              ))
            ) : (
              <p className="text-sm sm:text-base text-gray-600 text-center">هیچ نتیجه‌ای برای "{searchTerm}" یافت نشد.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Page;
