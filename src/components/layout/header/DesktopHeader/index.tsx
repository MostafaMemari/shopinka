import { getCategoriesCatch } from '@/features/categories/cartService';
import BasketDropdown from '@/features/cart/components/views/CartBasket/BasketDropdown';

import DesktopLogo from '../../../common/Logo/DesktopLogo';
import SearchBarBase from '../DesktopHeader/Search/SearchBar';
import ProfileDropdown from '../DesktopHeader/ProfileDropdown';
import DesktopNavbar from './DesktopNavbar';

async function DesktopHeader() {
  const categories = (
    await getCategoriesCatch({
      includeChildren: true,
      type: 'PRODUCT',
      includeOnlyTopLevel: true,
    })
  ).items;

  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="container z-30 flex items-center justify-between gap-x-4 py-4">
          <div className="flex items-center gap-x-6">
            <DesktopLogo />
            <SearchBarBase />
          </div>
          <div className="flex items-center gap-x-3">
            <ProfileDropdown />
            <div className="h-6 w-px bg-gray-300" />
            <BasketDropdown />
          </div>
        </div>
      </div>
      <DesktopNavbar categories={categories} />
    </>
  );
}

export default DesktopHeader;
