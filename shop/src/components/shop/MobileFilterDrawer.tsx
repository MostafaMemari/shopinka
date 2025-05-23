'use client';

import { FC, useEffect, useRef } from 'react';
import { FiX, FiChevronLeft } from 'react-icons/fi';
import Accordion from './Accordion';

interface FilterConfig {
  categories: string[];
  brands: { id: string; label: string; value: string }[];
  colors: { id: string; label: string; color: string }[];
}

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange?: (filters: any) => void;
  config: FilterConfig;
}

const MobileFilterDrawer: FC<MobileFilterDrawerProps> = ({ isOpen, onClose, onFilterChange, config }) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleApplyFilters = () => {
    onClose();
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  return (
    <div
      ref={drawerRef}
      className={`fixed bottom-0 left-0 right-0 z-40 h-full w-full bg-muted transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-labelledby="shop-filter-drawer-navigation-label"
      tabIndex={-1}
      id="shop-filter-drawer-navigation"
    >
      <div className="flex items-center justify-between gap-x-4 border-b p-4 pb-5">
        <h5 className="text-lg text-text/90">فیلتر محصولات</h5>
        <button
          className="inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-text/90 hover:bg-zinc-100 hover:text-gray-900 dark:hover:bg-black dark:hover:text-white"
          onClick={onClose}
          type="button"
          aria-controls="shop-filter-drawer-navigation"
          data-drawer-hide="shop-filter-drawer-navigation"
        >
          <FiX className="h-5 w-5" />
          <span className="sr-only">بستن منو</span>
        </button>
      </div>

      <div className="h-full pb-[150px]">
        <ul className="h-full space-y-6 overflow-y-auto p-4" dir="rtl">
          <li>
            <label className="sr-only">جستجوی فروشگاه</label>
            <input
              className="w-full rounded-lg border-none bg-background px-2 py-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0"
              placeholder="جستجو در بین نتایج ..."
              type="text"
            />
          </li>
          <li>
            <div>
              <p className="mb-4">محدوده قیمت</p>
              <div className="space-y-4">
                <div id="shop-price-slider"></div>
                <div className="flex items-center justify-between">
                  <div className="text-primary">
                    <span className="text-xs font-bold xl:text-sm" id="shop-price-slider-min"></span>
                    <span className="text-xs">تومان</span>
                  </div>
                  <div className="text-primary">
                    <span className="text-xs font-bold xl:text-sm" id="shop-price-slider-max"></span>
                    <span className="text-xs">تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <Accordion title="دسته بندی ها">
            <ul className="space-y-2 rounded-lg">
              {config.categories.map((category, index) => (
                <li key={index}>
                  <a className="flex items-center gap-x-2 rounded-lg px-4 py-3" href="#">
                    <span>{category}</span>
                    <FiChevronLeft className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </Accordion>
          <Accordion title="برند ها">
            <ul className="space-y-2 rounded-lg" id="brandListFilterMobile">
              <li className="p-2">
                <label className="sr-only">جستجوی برند</label>
                <input
                  id="brandListFilterMobileSearchInput"
                  className="w-full rounded-lg border-none bg-background px-2 py-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0"
                  placeholder="جستجوی برند ..."
                  type="text"
                />
              </li>
              {config.brands.map((brand) => (
                <li key={brand.id}>
                  <div className="flex w-full items-center gap-x-2 pr-4">
                    <input
                      id={brand.id}
                      type="checkbox"
                      value=""
                      className="h-4 w-4 cursor-pointer rounded-xl bg-background dark:border-gray-600 dark:bg-zinc-700"
                    />
                    <label
                      htmlFor={brand.id}
                      className="flex w-full cursor-pointer items-center justify-between py-2 pl-4 font-medium text-text/90"
                    >
                      <span>{brand.label}</span>
                      <span>{brand.value}</span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion>
          <Accordion title="رنگ ها">
            <ul className="space-y-2 rounded-lg" id="colorListFilterMobile">
              <li className="p-2">
                <label className="sr-only">جستجوی رنگ</label>
                <input
                  id="colorListFilterMobileSearchInput"
                  className="w-full rounded-lg border-none bg-background px-2 py-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0"
                  placeholder="جستجوی رنگ ..."
                  type="text"
                />
              </li>
              {config.colors.map((color) => (
                <li key={color.id}>
                  <div className="flex w-full items-center gap-x-2 pr-4">
                    <input
                      id={color.id}
                      type="checkbox"
                      value=""
                      className="h-4 w-4 cursor-pointer rounded-xl bg-background dark:border-gray-600 dark:bg-zinc-700"
                    />
                    <label
                      htmlFor={color.id}
                      className="flex w-full cursor-pointer items-center justify-between py-2 pl-4 font-medium text-text/90"
                    >
                      <span>{color.label}</span>
                      <span
                        className="h-4 w-4 rounded-full ring-2 ring-gray-200 dark:ring-zinc-700"
                        style={{ background: color.color }}
                      ></span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion>
          <li>
            <label className="flex cursor-pointer items-center justify-between py-3" htmlFor="onlyAvailableMobile">
              <div>فقط کالا های موجود</div>
              <div className="relative inline-flex cursor-pointer items-center">
                <input className="peer sr-only" id="onlyAvailableMobile" type="checkbox" />
                <div className="peer h-6 w-11 rounded-full bg-background after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-muted after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:ring-emerald-500 dark:bg-zinc-800 peer-focus:dark:ring-emerald-400"></div>
              </div>
            </label>
          </li>
          <li>
            <label className="flex cursor-pointer items-center justify-between py-3" htmlFor="onlySpecialMobile">
              <div>فقط محصولات ویژه</div>
              <div className="relative inline-flex cursor-pointer items-center">
                <input className="peer sr-only" id="onlySpecialMobile" type="checkbox" />
                <div className="peer h-6 w-11 rounded-full bg-background after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-muted after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:ring-emerald-500 dark:bg-zinc-800 peer-focus:dark:ring-emerald-400"></div>
              </div>
            </label>
          </li>
        </ul>
      </div>

      <div className="sticky bottom-0 left-0 right-0 flex items-center justify-between border-t bg-muted p-4 px-6 py-4">
        <button className="btn-primary w-full py-3 text-sm" type="button" onClick={handleApplyFilters}>
          مشاهده 200 محصول
        </button>
      </div>
    </div>
  );
};

export default MobileFilterDrawer;
