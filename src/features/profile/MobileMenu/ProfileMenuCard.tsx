'use client';

import React, { useEffect } from 'react';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useAppSelector } from '@/store/hooks';
import { useBoolean } from '@/hooks/use-boolean';
import { Menu, UserCircle } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import MobileDrawer from '@/components/common/Drawer';
import ProfileMenu from '../ProfileMenu';
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
  }, [isDesktop]);

  if (!isMounted) return null;

  return (
    <>
      <div className="rounded-lg bg-muted p-6 shadow-base lg:hidden mb-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <div className="relative">
              <UserCircle className="h-20 w-20 only:rounded-full" />
            </div>
            <div>
              <p className="line-clamp-1">{!!user?.full_name ? user.full_name : 'کاربر گرامی'}</p>
              <p className="text-text/60">{user?.mobile}</p>
            </div>
            <div>
              <MobileDrawer
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
              </MobileDrawer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileMenuCard;
