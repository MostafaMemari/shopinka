'use client';

import React, { useEffect } from 'react';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useAppSelector } from '@/store/hooks';
import { useBoolean } from '@/hooks/use-boolean';
import { Menu, UserCircle } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import AppDrawer from '@/components/wrappers/AppDrawer';
import ProfileMenu from '../ProfileMenu';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function ProfileMenuCard() {
  const { user } = useAppSelector((state) => state.auth);
  const isMounted = useIsMounted();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const drawerControl = useBoolean(false);

  useEffect(() => {
    if (isDesktop) {
      drawerControl.onFalse();
    }
  }, [isDesktop, drawerControl]);

  if (!isMounted) return null;

  return (
    <Card className="p-6 lg:hidden mb-4">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="relative">
            <UserCircle className="h-20 w-20 only:rounded-full" />
          </div>
          <div className="text-center space-y-1">
            <Label className="line-clamp-1 text-md">{!!user?.full_name ? user.full_name : 'کاربر گرامی'}</Label>
            <Label className="text-text/60 text-md">{user?.mobile}</Label>
          </div>
          <div>
            <AppDrawer
              open={drawerControl.value}
              onOpenChange={drawerControl.setValue}
              title="منوی پنل کاربری"
              showClose={false}
              trigger={
                <Button>
                  <Menu /> منوی پنل کاربری
                </Button>
              }
            >
              <ProfileMenu onClose={drawerControl.onFalse} />
            </AppDrawer>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProfileMenuCard;
