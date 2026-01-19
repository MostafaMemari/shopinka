import { Card } from '@/components/ui/card';
import React from 'react';

import Breadcrumb from '@/components/common/Breadcrumb';
import ProductCommentCount from '@/features/comments/components/ProductComments/ProductCommentCount';
import MobileCartSticky from '@/components/common/MobileCartSticky';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { ProductDetails } from '@/features/products/ProductType';

import ProductImageSwiper from '../../ProductImageSwiper';
import ProductSku from '../../ProductSku';
import { ProductDetailsPrice } from '../../ProductDetailsPrice';
import { ProductStatusList } from '../../ProductStatusList';
import ProductFavoriteIcon from '../../ProductFavoriteIcon';
import ProductShareIcon from '../../ProductShareIcon';

interface ProductMobileDetailsProps {
  product: ProductDetails;
  breadcrumbItems: { label: string; href: string }[];
  ProductVariant: React.ReactNode;
  AddToCard: React.ReactNode;
}

function ProductMobileDetails({ product, breadcrumbItems, ProductVariant, AddToCard }: ProductMobileDetailsProps) {
  const isVariableProduct = product.type === 'VARIABLE';

  return <></>;
}

export default ProductMobileDetails;
