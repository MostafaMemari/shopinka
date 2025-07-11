import DesktopLogo from '../../ui/Logo/DesktopLogo';
import ProfileDropdown from './ProfileDropdown';
import SearchBarBase from './Search/SearchBar';
import BasketDropdown from '../../features/cart/views/BasketDropdown';
import DesktopNavbar from './DesktopNavbar';
import { getCategoriesCatch } from '@/service/categoryService';

async function Header() {
  const categories = (await getCategoriesCatch({ includeChildren: true, type: 'PRODUCT', includeOnlyTopLevel: true })).items;

  return (
    <header>
      <div className="fixed left-0 right-0 top-0 z-30 bg-muted">
        <div className="hidden lg:block">
          <div className="container relative z-30 flex max-w-[1640px] items-center justify-between gap-x-4 bg-muted py-4">
            <div className="flex items-center gap-x-6">
              <DesktopLogo />
              <SearchBarBase />
            </div>
            <div className="flex items-center gap-x-3">
              <ProfileDropdown />
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
              <BasketDropdown />
            </div>
          </div>

          <div className="absolute left-0 right-0 z-20">
            <DesktopNavbar categories={categories} />
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
