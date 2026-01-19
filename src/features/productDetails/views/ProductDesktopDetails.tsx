import ProductGallery from '../ProductGallery/ProductGallery';
import ProductGuarantees from '../ProductGuarantees';
import ProductProperties from '../ProductProperties';

import FavoriteProductAction from '../ActionButtons/FavoriteProductAction';
import ShareProductAction from '../ActionButtons/ShareProductAction';
import React from 'react';
import { Card } from '@/components/ui/card';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductSku from '../ProductSku';
import ProductCommentCount from '@/features/comments/components/ProductComments/ProductCommentCount';
import { ProductStatusList } from '../ProductStatusList';
import { ProductDetailsPrice } from '../ProductDetailsPrice';
import { ProductDetails } from '@/features/products/ProductType';

interface ProductDesktopDetailsProps {
  product: ProductDetails;
  breadcrumbItems: { label: string; href: string }[];
  ProductVariant: React.ReactNode;
  AddToCard: React.ReactNode;
}

function ProductDesktopDetails({ product, breadcrumbItems, ProductVariant, AddToCard }: ProductDesktopDetailsProps) {
  return <></>;
}

export default ProductDesktopDetails;
