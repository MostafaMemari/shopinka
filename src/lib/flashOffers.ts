import { FlashProduct } from '@/components/layout/home/FlashOfferCard/types';
import { Product } from '@/features/products/ProductType';

export interface FlashOfferResult {
  flashOfferItems: FlashProduct[];
  mainProduct?: FlashProduct;
}

export function generateFlashOffer(allItems: Product[], count = 4): FlashOfferResult {
  if (!allItems || allItems.length === 0) {
    return { flashOfferItems: [], mainProduct: undefined };
  }

  const uniqueItemsMap = new Map<number | string, Product>();
  allItems.forEach((item) => uniqueItemsMap.set(item.id, item));
  const uniqueItems = Array.from(uniqueItemsMap.values());

  const shuffled = [...uniqueItems].sort(() => 0.5 - Math.random());
  const selectedFlash = shuffled.slice(0, count);

  const flashOfferItems: FlashProduct[] = selectedFlash.map((item) => ({
    id: item.id,
    title: item.name,
    price: item.salePrice ? item.salePrice : item.basePrice ? item.basePrice : undefined,
    image: item.mainImage ? item.mainImage.fileUrl : '',
    href: `/product/${item.slug}`,
  }));

  const flashIds = new Set(selectedFlash.map((item) => item.id));
  const remainingItems = uniqueItems.filter((item) => !flashIds.has(item.id));

  const mainProductItem = remainingItems.length > 0 ? remainingItems[Math.floor(Math.random() * remainingItems.length)] : undefined;

  const mainProduct: FlashProduct | undefined = mainProductItem
    ? {
        id: mainProductItem.id,
        title: mainProductItem.name,
        price: mainProductItem.salePrice ? mainProductItem.salePrice : mainProductItem.basePrice ? mainProductItem.basePrice : undefined,
        image: mainProductItem.mainImage ? mainProductItem.mainImage.fileUrl : '',
        href: `/product/${mainProductItem.slug}`,
      }
    : undefined;

  return { flashOfferItems, mainProduct };
}
