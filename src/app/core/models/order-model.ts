import {mockProduct, ProductModel} from './product-model';

export interface ProductOrderModel<T> {
  product: T;
  quantity: number;
  details: string;
}

export function mockOrder(): ProductOrderModel<ProductModel> {
  return {
    product: mockProduct(),
    quantity: 1,
    details: '',
  };
}
