'use client';

import React, { useState, useEffect } from 'react';
import { FaTruck, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import { formatPrice } from '@/utils/formatter';
import { ShippingItem } from '@/types/shippingType';

interface DeliverySectionProps {
  onShippingSelect: (shippingSelectedItem: ShippingItem | null) => void;
  shippings: ShippingItem[];
}

export default function DeliverySection({ onShippingSelect, shippings }: DeliverySectionProps) {
  const [selected, setSelected] = useState<string | number | null>(null);

  useEffect(() => {
    if (shippings.length && selected === null) {
      const firstItem = shippings[0];
      setSelected(firstItem.id);
      onShippingSelect(firstItem);
    }
  }, [shippings, selected, onShippingSelect]);

  return (
    <>
      <div className="flex items-center justify-between gap-x-2 pb-4">
        <h2 className="flex items-center gap-x-2 text-sm xs:text-base md:text-lg font-medium text-gray-800">
          <FaTruck className="h-5 w-5 text-primary" />
          شیوه ارسال
        </h2>
      </div>
      <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {shippings.map((item) => {
          const isChecked = selected === item.id;
          return (
            <div key={item.id} className="relative">
              <input
                type="radio"
                name="delivery"
                value={item.id}
                id={`delivery-${item.id}`}
                className="peer hidden"
                checked={isChecked}
                onChange={() => {
                  setSelected(item.id);
                  onShippingSelect(item);
                }}
              />
              <label
                htmlFor={`delivery-${item.id}`}
                className={`
                      relative block h-[140px] cursor-pointer rounded-lg border p-4 shadow-sm transition-all
                      ${isChecked ? 'border-primary bg-primary/10 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}
                    `}
              >
                <span className="absolute right-4 top-4 flex items-center justify-center h-6 w-6">
                  <span
                    className={`
                          flex items-center justify-center rounded-full border-2 h-6 w-6 transition-colors
                          ${isChecked ? 'border-primary bg-primary' : 'border-gray-300 bg-white'}
                        `}
                  >
                    {isChecked && (
                      <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                </span>
                <div className="mb-4 flex items-center justify-between gap-x-2">
                  <p className="line-clamp-1 pr-9 text-sm font-medium text-gray-900 xs:text-base">{item.name}</p>
                  <FaTruck className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-2 flex items-center gap-x-2 text-sm text-primary">
                  <FaMoneyBillWave className="h-4 w-4" />
                  <span>{item.price === 0 ? 'رایگان' : `${formatPrice(item.price)} تومان`}</span>
                </div>
                <div className="flex items-center gap-x-2 text-sm text-gray-500">
                  <FaClock className="h-4 w-4" />
                  <span>تحویل در {item.estimatedDays} روز</span>
                </div>
              </label>
            </div>
          );
        })}
      </fieldset>
    </>
  );
}
