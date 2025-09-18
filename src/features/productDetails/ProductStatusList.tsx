// ProductStatusList.tsx
import { Card } from '@/components/ui/card';
import { Truck, ShieldCheck, Star } from 'lucide-react';
import React from 'react';
import { ProductStatusBadge } from './ProductStatusBadge';
import { Separator } from '@/components/ui/separator';

export function ProductStatusList() {
  return (
    <Card className="bg-muted/50 mb-6 p-4">
      <ul className="flex flex-col gap-2">
        <ProductStatusBadge icon={<Truck />} label="ارسال فروشگاه اصلی" status="آماده ارسال" />

        <Separator className="my-2" />

        <ProductStatusBadge icon={<ShieldCheck />} label="گارانتی محصول" status="یک ساله" />

        <Separator className="my-2" />

        <ProductStatusBadge icon={<Star />} label="امتیاز ویژه" status="ویژه کاربران" />
      </ul>
    </Card>
  );
}
