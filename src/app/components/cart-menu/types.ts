import { IProduct } from '~types/product';

export interface IEmitAddToCart {
  product: IProduct;
  count: number;
}

export interface IEmitChangeProductCount {
  id: number;
  count: number;
}
