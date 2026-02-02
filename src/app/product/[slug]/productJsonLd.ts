import { ProductDetails } from '@/features/products/ProductType';

export function buildProductJsonLd(product: ProductDetails) {
  if (!product?.slug) return null;

  const hasDiscount = product.salePrice !== null;

  const finalPriceToman = hasDiscount ? product.salePrice! : product.basePrice || 0;

  const finalPriceRial = finalPriceToman * 10;
  const basePriceRial = (product.basePrice || 0) * 10;

  const imageUrl = product?.mainImage?.fileUrl;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || product.description,
    image: imageUrl ? [imageUrl] : undefined,
    sku: product.id.toString(),
    url: `https://shopinka.ir/product/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'Shopinka',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IRR',
      price: finalPriceRial,
      availability: product.quantity && product.quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',

      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],

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
