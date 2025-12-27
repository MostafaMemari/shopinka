'use client';

import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

function PhoneIcon() {
  const router = useRouter();

  const handlePhoneIconClick = () => {
    router.push('tel:+989393139439');
  };

  return (
    <Button asChild onClick={handlePhoneIconClick} variant="ghost" size="sm" className="size-12 cursor-pointer">
      <Phone />
    </Button>
  );
}

export default PhoneIcon;
