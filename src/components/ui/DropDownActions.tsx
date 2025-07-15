'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { HiDotsVertical } from 'react-icons/hi';
import { Fragment } from 'react';

interface AddressActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function AddressActions({ onEdit, onDelete }: AddressActionsProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
        <HiDotsVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </MenuButton>

      <MenuItems
        as="div"
        className="absolute left-0 mt-2 w-36 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50 dark:bg-gray-900 dark:ring-white/10"
      >
        <div className="py-1 text-sm text-gray-700 dark:text-gray-200">
          <MenuItem as={Fragment}>
            {({ active }) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 ${active ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              >
                <BiPencil className="h-4 w-4" />
                ویرایش
              </button>
            )}
          </MenuItem>

          <MenuItem as={Fragment}>
            {({ active }) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 ${
                  active ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
              >
                <BiTrash className="h-4 w-4" />
                حذف
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
