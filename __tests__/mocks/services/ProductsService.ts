import { getMockProduct } from '../data/product';

export const mockProductsService = jasmine.createSpyObj([
  'requestProduct',
  'getProduct',
  'getProductError',
  'productIsLoading',
  'productsIsLoading',
  'getProducts'
]);
export const mockProductData = getMockProduct({ id: 1 });
export const mockProductsData = [getMockProduct({ id: 1 }), getMockProduct({ id: 2 })];
