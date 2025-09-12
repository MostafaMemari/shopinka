'use client';

import {
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { forwardRef, ReactNode } from 'react';

type DropdownMenuItemType = {
  label: string;
  icon?: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
};

type AppDropdownMenuProps = {
  trigger: ReactNode;
  items: DropdownMenuItemType[];
  align?: 'start' | 'end' | 'center';
  className?: string;
  triggerClassName?: string;
  showChevron?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
};

const DropdownMenu = forwardRef<HTMLDivElement, AppDropdownMenuProps>(
  ({ trigger, items, align = 'end', className, triggerClassName, showChevron = false, open, onOpenChange, modal = false }, ref) => {
    return (
      <ShadcnDropdownMenu modal={modal} open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild className={cn(triggerClassName)}>
          {trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className={cn('w-60', className)} ref={ref}>
          {items.map((item, index) => (
            <div key={item.href || index}>
              {item.href ? (
                <DropdownMenuItem asChild className={cn('p-3 cursor-pointer', item.className)}>
                  <a href={item.href} className={cn('flex items-center gap-2', item.textClassName)} onClick={(e) => item.onClick?.(e)}>
                    {item.icon && item.icon}
                    <span>{item.label}</span>
                  </a>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={(e) => item.onClick?.(e)}
                  className={cn('p-3 cursor-pointer', item.className)}
                  disabled={item.disabled}
                >
                  {item.icon && item.icon}
                  <span className={cn(item.textClassName)}>{item.label}</span>
                </DropdownMenuItem>
              )}
              {index < items.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </ShadcnDropdownMenu>
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
