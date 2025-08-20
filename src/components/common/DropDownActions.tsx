'use client';

import { useState, useRef, useEffect } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { HiDotsVertical } from 'react-icons/hi';

interface AddressActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function AddressActions({ onEdit, onDelete }: AddressActionsProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        tabIndex={0}
      >
        <HiDotsVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-36 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50 dark:bg-gray-900 dark:ring-white/10">
          <div className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onEdit();
              }}
              className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <BiPencil className="h-4 w-4" />
              ویرایش
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onDelete();
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800"
            >
              <BiTrash className="h-4 w-4" />
              حذف
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
