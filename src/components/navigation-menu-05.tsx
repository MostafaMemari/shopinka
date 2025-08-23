import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui';

import { useMemo, useState } from 'react';
import { useIsMounted } from '@/hooks/useIsMounted';
import { Category } from '@/types/categoryType';
import SubCategoryList from './layout/header/DesktopNavbar/SubCategoryList';
import { navigationMenuItems } from '@/data/menuData';

interface NavigationMenuWithActiveItemProps {
  categories: Category[];
}

export default function NavigationMenuWithActiveItem({ categories }: NavigationMenuWithActiveItemProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.id === selectedCategoryId) || categories[0],
    [categories, selectedCategoryId],
  );

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-3">
        <NavigationMenuItem key="categories">
          <NavigationMenuLink asChild>
            <HoverCard openDelay={30} closeDelay={120} open={isOpen} onOpenChange={setIsOpen}>
              <HoverCardTrigger>
                <div
                  className={cn('flex items-center gap-2 text-sm font-medium cursor-pointer text-gray-800 dark:text-gray-200', {
                    'text-primary': isOpen,
                  })}
                >
                  <ShoppingBag className="w-4 h-4" /> دسته‌بندی‌ها
                </div>
              </HoverCardTrigger>
              <HoverCardContent align="start" className="w-[800px] p-0 mt-0.5">
                <div className="flex h-[450px] max-h-[450px] w-full overflow-hidden rounded-b-lg">
                  <div className="w-48 bg-background overflow-y-auto main-scroll">
                    <ul dir="rtl">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/product-category/${category.slug}`}
                            className={`flex py-4 pr-4 text-sm ${
                              category.id === selectedCategoryId
                                ? 'text-primary font-bold bg-white dark:bg-neutral-900'
                                : 'text-neutral-600 dark:text-neutral-100 hover:text-primary hover:bg-white dark:hover:bg-neutral-900'
                            }`}
                            onMouseEnter={() => setSelectedCategoryId(category.id)}
                            onClick={() => setIsOpen(false)}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-1 overflow-auto main-scroll">
                    {selectedCategory && <SubCategoryList category={selectedCategory} onLinkClick={() => setIsOpen(false)} />}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {navigationMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className={cn(
                'relative group inline-flex h-9 w-max items-center justify-center px-0.5 py-2 text-sm font-medium',
                'before:absolute before:bottom-0 before:inset-x-0 before:h-[2px] before:bg-primary before:scale-x-0 before:transition-transform',
                'hover:before:scale-x-100 hover:text-accent-foreground',
                'focus:before:scale-x-100 focus:text-accent-foreground focus:outline-none',
                'disabled:pointer-events-none disabled:opacity-50',
                'data-[active]:before:scale-x-100 data-[state=open]:before:scale-x-100',
              )}
              asChild
            >
              <Link href={item.href}>
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" /> {item.title}
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
