import React from 'react';

interface ProductProperty {
  label: string;
  value: string;
}

interface ProductPropertiesProps {
  title?: string;
  properties?: ProductProperty[];
}

export default function ProductProperties({ title = 'ویژگی‌های محصول', properties }: ProductPropertiesProps) {
  if (!properties || properties.length === 0) return null;

  return (
    <div className="overflow-auto hide-scrollbar">
      {title && <p className="mb-2 text-lg font-medium text-gray-800">{title}</p>}
      <ul className="!pb-0 flex gap-1 w-max lg:w-auto lg:gap-2 mt-2 lg:mt-0 lg:grid lg:grid-cols-3 lg:overflow-hidden">
        {properties.map((prop, index) => (
          <li key={index} className="flex flex-col items-start justify-start bg-neutral-100 p-2 rounded-md">
            <div className="flex flex-col gap-2 max-w-[150px]">
              <div>
                <p className="text-neutral-500 text-sm !leading-none lg:!leading-6 lg:break-all lg:overflow-hidden ellipsis-1">
                  {prop.label}
                </p>
                <p className="text-neutral-700 font-semibold !leading-none lg:!leading-6 break-all lg:overflow-hidden ellipsis-1">
                  {prop.value}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
