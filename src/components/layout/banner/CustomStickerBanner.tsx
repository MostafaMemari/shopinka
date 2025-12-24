import Link from 'next/link';
import React from 'react';

function CustomStickerBanner() {
  return (
    <div className="w-full" style={{ height: '100px' }}>
      <Link href="/sticker-maker" rel="noopener noreferrer" className="block w-full z-40">
        <div className="w-full h-[35px] md:h-[60px] bg-[rgba(0,0,0,0.04)] overflow-hidden">
          <img src="/gifs/banners/custom-sticker.gif" alt="ساخت برچسب سفارشی" className="w-full h-full object-cover" />
        </div>
      </Link>
    </div>
  );
}

export default CustomStickerBanner;
