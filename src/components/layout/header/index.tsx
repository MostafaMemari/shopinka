// Header.tsx
import DesktopLogo from '../../common/Logo/DesktopLogo';
import ProfileDropdown from './ProfileDropdown';
import SearchBarBase from './Search/SearchBar';
import BasketDropdown from '../../../features/cart/components/views/BasketDropdown';
import DesktopNavbar from './DesktopNavbar';
import { getCategoriesCatch } from '@/features/categories/cartService';
import { cn } from '@/lib/utils';

async function Header() {
  const categories = (
    await getCategoriesCatch({
      includeChildren: true,
      type: 'PRODUCT',
      includeOnlyTopLevel: true,
    })
  ).items;

  const headerHeight = 92;

  return (
    <>
      <header className="hidden md:block">
        <div className="fixed left-0 right-0 top-0 z-30 bg-white" style={{ height: headerHeight }}>
          <div className="hidden md:block">
            <div className="container flex max-w-[1640px] items-center justify-between gap-x-4 py-4">
              <div className="flex items-center gap-x-6">
                <DesktopLogo />
                <SearchBarBase />
              </div>
              <div className="flex items-center gap-x-3">
                <ProfileDropdown />
                <div className="h-6 w-px bg-border" />
                <BasketDropdown />
              </div>
            </div>
          </div>
        </div>
        <div className={cn('hidden md:block fixed left-0 right-0 z-20')} style={{ top: headerHeight }}>
          <DesktopNavbar categories={categories} />
        </div>
      </header>
    </>
  );
}

export default Header;
