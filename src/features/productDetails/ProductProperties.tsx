import React from 'react';

interface ProductProperty {
  label: string;
  value: string;
}

interface ProductPropertiesProps {
  title?: string;
  properties?: ProductProperty[];
}

export default function ProductProperties({ title = 'ویژگی‌ های محصول', properties }: ProductPropertiesProps) {
  if (!properties || properties.length === 0) return null;

  return (
    <div className="w-full">
      {title && <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>}

      <ul className="flex flex-wrap gap-3 overflow-visible">
        {properties.map((prop, index) => (
          <li
            key={index}
            className="flex items-center justify-center gap-2 bg-gray-50/80 border border-gray-100 p-2 rounded-xl min-w-[80px] transition-all"
          >
            <span className="text-gray-400 text-xs font-medium whitespace-nowrap">{prop.label}:</span>

            <span className="text-gray-700 text-xs font-bold leading-6">{prop.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
