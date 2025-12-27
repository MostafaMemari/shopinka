'use client';

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { TableOfContents } from 'lucide-react';
import Link from 'next/link';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../../ui/hover-card';

import { useMemo, useState } from 'react';
import { Category } from '@/features/categories/CategoryType';
import SubCategoryList from './SubCategoryList';
import { navigationMenuItems } from '@/data/menuData';
import { Separator } from '@/components/ui/separator';

interface NavigationMenuWithActiveItemProps {
  categories: Category[];
}

export default function NavigationMenuDesktop({ categories }: NavigationMenuWithActiveItemProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.id === selectedCategoryId) || categories[0],
    [categories, selectedCategoryId],
  );

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex h-5 items-center space-x-1 text-sm">
        <NavigationMenuItem key="categories">
          <NavigationMenuLink asChild>
            <HoverCard openDelay={30} closeDelay={120} open={isOpen} onOpenChange={setIsOpen}>
              <HoverCardTrigger>
                <div
                  className={cn('flex p-2 items-center gap-2 text-sm font-medium cursor-pointer text-gray-800 dark:text-gray-200', {
                    'text-primary': isOpen,
                  })}
                >
                  <TableOfContents className="w-4 h-4" /> دسته‌بندی‌ ها
                </div>
              </HoverCardTrigger>
              <HoverCardContent align="start" className="w-[800px] p-0 mt-0.5 rounded-none rounded-b-2xl" sideOffset={-2}>
                <div className="flex h-[450px] max-h-[450px] w-full overflow-hidden">
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

        <Separator orientation="vertical" />

        {navigationMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className="relative group inline-flex items-center justify-center p-2 text-sm font-medium
             before:absolute before:bottom-0 before:h-[2px] before:w-0 before:bg-primary before:transition-all
             hover:before:w-full hover:text-accent-foreground
             focus:before:w-full focus:text-accent-foreground focus:outline-none"
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
