'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

function BackIcon() {
  const router = useRouter();

  const handleBackIconClick = () => {
    router.back();
  };

  return (
    <Button onClick={handleBackIconClick} asChild variant="ghost" size="sm" className="size-12 cursor-pointer">
      <ArrowRight />
    </Button>
  );
}

export default BackIcon;
