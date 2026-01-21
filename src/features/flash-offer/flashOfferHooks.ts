import { Product } from '../products/ProductType';
import { generateFlashOffer } from './flashOfferServices';

export function useFlashOffer(products: Product[]) {
  return generateFlashOffer(products);
}
