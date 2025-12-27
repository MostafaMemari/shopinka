import { MenuIcon } from 'lucide-react';
import React from 'react';

import DropdownMenu from '@/components/common/DropdownMenu';
import { Button } from '@/components/ui/button';

function DropdownItemMobile() {
  return (
    <DropdownMenu
      items={[
        { label: 'صفحه نخست', href: '/' },
        { label: 'مجله', href: '/blog' },
        { label: 'پرسش های متداول', href: '/faq' },
        { label: 'تماس با ما', href: '/contact' },
      ]}
      trigger={
        <Button asChild variant="ghost" size="sm" className="size-12 cursor-pointer">
          <MenuIcon />
        </Button>
      }
    />
  );
}

export default DropdownItemMobile;
