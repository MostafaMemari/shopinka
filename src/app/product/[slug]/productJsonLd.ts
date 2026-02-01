import { Product } from '@/features/products/ProductType';

export function buildProductJsonLd(product: Product, siteUrl: string) {
  const hasDiscount = product.salePrice !== null;

  const finalPriceToman = hasDiscount ? product.salePrice! : product.basePrice || 0;

  const finalPriceRial = finalPriceToman * 10;
  const basePriceRial = (product.basePrice || 0) * 10;

  const imageUrl = product?.mainImage?.fileUrl ?? undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: imageUrl ? [imageUrl] : [],
    sku: product.id.toString(),
    url: `${siteUrl}/product/${product.slug}`,

    offers: {
      '@type': 'Offer',
      priceCurrency: 'IRR',
      price: finalPriceRial,
      availability: product.quantity && product.quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',

      ...(hasDiscount && {
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'IRR',
          price: basePriceRial,
        },
      }),
    },
  };
}
