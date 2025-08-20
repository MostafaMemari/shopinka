'use client';

import { toast } from 'sonner';
import { cn } from '@/utils/utils';
import React from 'react';
import { HiOutlineShare } from 'react-icons/hi';

function ShareProductAction({ className }: { className?: string }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('لینک محصول با موفقیت کپی شد');
  };

  return (
    <button
      type="button"
      onClick={handleCopyLink}
      className={cn('text-gray-700 hover:text-blue-500 dark:text-white transition-colors duration-200', className)}
      aria-label="اشتراک‌گذاری"
    >
      <HiOutlineShare className="h-6 w-6" />
    </button>
  );
}

export default ShareProductAction;
