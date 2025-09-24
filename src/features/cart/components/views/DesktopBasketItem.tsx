import Image from 'next/image';
import Link from 'next/link';
import { CartItemState } from '@/features/cart/cartType';
import CartControls from '@/features/cart/components/CartControls';
import CartItemAttributes from '@/features/cart/components/CartItemAttributes';
import BasketItemPrice from './BasketItemPrice';

export interface ItemCardBasketProp {
  item: CartItemState;
}

export default function DesktopBasketItem({ item }: ItemCardBasketProp) {
  const attributes = item.type === 'VARIABLE' && item.attributeValues ? item.attributeValues : [];
  const productUrl = `/product/${item.slug}`;

  return (
    <div className="flex items-center gap-x-3 py-3 border-b border-gray-100">
      <div className="relative min-w-fit">
        <Link href={productUrl} className="min-w-fit">
          <Image
            alt={item.title}
            className="h-16 w-16 object-cover rounded"
            src={item?.thumbnail ?? ''}
            width={64}
            height={64}
            loading="lazy"
            unoptimized
          />
        </Link>
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <Link href={productUrl} className="text-sm font-medium text-gray-900 truncate block">
          {item.title}
        </Link>

        <div className="flex items-center gap-x-2 text-sm text-text/60">
          <div>تعداد: {item.count}</div>

          <CartItemAttributes type={item.type} attributes={attributes} />
        </div>

        <div className="flex items-center justify-between gap-x-2">
          <BasketItemPrice salePrice={item.salePrice * item.count} basePrice={item.basePrice * item.count} />

          <div className="w-24">
            <CartControls className="h-10" product={item} />
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function DesktopBasketItem({ item }: ItemCardBasketProp) {
//   const attributes = item.type === 'VARIABLE' && item.attributeValues ? item.attributeValues : [];
//   const productUrl = `/product/${item.slug}`;

//   return (
//     <div className="flex items-center gap-x-3 py-3 border-b border-gray-100">
//       <Link href={productUrl} className="min-w-fit">
//         <Image
//           alt={item.title}
//           className="h-16 w-16 object-cover rounded"
//           src={item?.thumbnail ?? ''}
//           width={64}
//           height={64}
//           loading="lazy"
//           unoptimized
//         />
//       </Link>

//       <div className="flex-1 min-w-0">
//         <Link href={productUrl} className="text-sm font-medium text-gray-900 truncate block">
//           {item.title}
//         </Link>
//         <div className="text-xs text-gray-500 mt-1">
//           <CartItemAttributes count={item.count} type={item.type} attributes={attributes} />
//         </div>
//       </div>

//       <div className="flex items-center gap-x-4">
//         <BasketItemPrice salePrice={item.salePrice * item.count} basePrice={item.basePrice * item.count} />
//         <div className="w-20">
//           <CartControls product={item} />
//         </div>
//       </div>
//     </div>
//   );
// }
