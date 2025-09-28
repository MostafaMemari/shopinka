export interface ProductCardLogic {
  id: number;
  basePrice: number;
  salePrice: number;
  type: 'VARIABLE' | 'SIMPLE';
  quantity: number | null;
}
