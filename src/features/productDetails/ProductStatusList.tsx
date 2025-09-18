// ProductStatusList.tsx
import { Card } from '@/components/ui/card';
import { Truck, ShieldCheck, Star, ShoppingBag, Store } from 'lucide-react';
import React from 'react';
import { ProductStatusBadge } from './ProductStatusBadge';
import { Separator } from '@/components/ui/separator';

interface ProductStatusListProps {
  specialFeature?: string;
}

export function ProductStatusList({ specialFeature }: ProductStatusListProps) {
  return (
    <Card className="bg-muted/50">
      <ul className="flex flex-col gap-2">
        <ProductStatusBadge
          icon={<Store />}
          label={
            <div className="flex flex-col gap-3">
              <span className="font-medium">فروشگاه اینترنتی شاپینکا</span>
              <span className="text-xs text-gray-500">
                عملکرد{' '}
                <>
                  <span className="font-bold text-emerald-600">عالی</span>
                </>
              </span>
            </div>
          }
        />

        <Separator className="my-2" />

        <ProductStatusBadge icon={<Truck />} label="آماده ارسال" />

        <Separator className="my-2" />

        <ProductStatusBadge icon={<ShieldCheck />} label="تضمین اصالت و سلامت" />

        {specialFeature && (
          <>
            <Separator className="my-2" />
            <ProductStatusBadge icon={<Star />} label={specialFeature} />
          </>
        )}
      </ul>
    </Card>
  );
}
