'use client';

import Copyright from './Copyright';
import SupportInfo from './SupportInfo';
import ScrollTopButton from './ScrollTopButton';
import MenuLinks from './MenuLinks';
import TrustBadges from './TrustBadges';
import { defaultFooterData, menuLinks1, menuLinks2, trustBadges } from '@/data/footerData';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t bg-muted">
      <div className="absolute inset-x-0 -top-3 flex items-center justify-center">
        <div className="relative flex h-10 w-14 justify-center">
          <div className="absolute inset-0 -top-[2px] h-full w-full rounded-full bg-muted blur-[6px]" />
          <ArrowUp className="relative h-5 w-5 text-gray-200" aria-hidden="true" />
        </div>
      </div>

      <div className="container">
        <div className="my-5 flex flex-col items-center justify-between gap-y-4 md:flex-row">
          <SupportInfo supportPhone={defaultFooterData.supportPhone} supportText={defaultFooterData.supportText} />
          <ScrollTopButton />
        </div>

        <div className="grid grid-cols-12 gap-y-10">
          <div className="col-span-12 md:col-span-6">
            <MenuLinks menuLinks1={menuLinks1} menuLinks2={menuLinks2} />
          </div>
          <div className="col-span-12 mb-3 flex items-center justify-center gap-x-2 md:col-span-6 md:justify-end">
            <TrustBadges trustBadges={trustBadges} />
          </div>
        </div>

        {defaultFooterData.copyright && <Copyright copyrightText={defaultFooterData.copyrightText} />}
      </div>
    </footer>
  );
};

export default Footer;
