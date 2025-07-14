'use client';

import { FC, useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface Props {
  title: string;
  isOpen?: boolean;
  onToggle?: () => void;
  checkActive?: () => boolean;
  className?: string;
  children: React.ReactNode;
}

const CategoryAccordion: FC<Props> = ({ title, isOpen, onToggle, checkActive, className = '', children }) => {
  const [open, setOpen] = useState(isOpen ?? false);

  useEffect(() => {
    if (checkActive) {
      setOpen(checkActive());
    } else if (isOpen !== undefined) {
      setOpen(isOpen);
    }
  }, [isOpen, checkActive]);

  const toggle = () => {
    setOpen((prev) => !prev);
    onToggle?.();
  };

  return (
    <li className={`border-b last:border-none ${className}`}>
      <button onClick={toggle} className="w-full flex items-center justify-between text-sm font-medium text-right cursor-pointer rounded">
        <span>{title}</span>
        <FiChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all ${open ? 'max-h-[300px]' : 'max-h-0'} pl-3`}>
        <div className="mt-2">{children}</div>
      </div>
    </li>
  );
};

export default CategoryAccordion;
