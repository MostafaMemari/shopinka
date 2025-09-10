import { shopInfo } from '@/data/shopInfo';
import React from 'react';

function ContactInfo() {
  return (
    <ul className="space-y-6">
      <li>
        <div className="flex flex-col gap-y-4">
          <p className="text-gray-700">آدرس ایمیل</p>
          <a href={`mailto:${shopInfo.email}`} className="text-primary hover:underline">
            {shopInfo.email}
          </a>
        </div>
      </li>
      <li>
        <div className="flex flex-col gap-y-4">
          <p className="text-gray-700">تلفن پشتیبانی</p>
          <a dir="ltr" href={`tel:${shopInfo.phone}`} className="text-primary hover:underline">
            {shopInfo.phone}
          </a>
        </div>
      </li>
      <li>
        <div className="flex flex-col gap-y-4">
          <p className="min-w-fit text-gray-700">آدرس دفتر</p>
          <div className="text-primary hover:underline">{shopInfo.address}</div>
        </div>
      </li>
    </ul>
  );
}

export default ContactInfo;
