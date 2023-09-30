import { TestBed } from '@angular/core/testing';

import { ProductsSortingService } from './products-sorting.service';
import { getMockProduct } from '__tests__/mocks/data/product';
import { deepClone } from '~utils/deepClone';

const mockProductsWithPrice = [
  getMockProduct({ id: 1, price: { value: 100, discount: 0 } }),
  getMockProduct({ id: 2, price: { value: 50, discount: 0 } }),
  getMockProduct({ id: 3, price: { value: 70, discount: 0 } })
];
const mockProductsWithPriceDiscount = [
  getMockProduct({ id: 1, price: { value: 100, discount: 50 } }),
  getMockProduct({ id: 2, price: { value: 50, discount: 20 } }),
  getMockProduct({ id: 3, price: { value: 70, discount: 0 } })
];
const mockProductsWithRating = [
  getMockProduct({ id: 1, rating: 5 }),
  getMockProduct({ id: 2, rating: 3 }),
  getMockProduct({ id: 3, rating: 4 })
];
const mockProductsWithoutRating = [
  getMockProduct({ id: 1, rating: null }),
  getMockProduct({ id: 2, rating: null }),
  getMockProduct({ id: 3, rating: 4 })
];

describe('ProductsSortingService', () => {
  let service: ProductsSortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsSortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return asc sorted products by price', () => {
    expect(service['sorting']('asc', deepClone(mockProductsWithPrice), 'price')).toEqual([
      mockProductsWithPrice[1],
      mockProductsWithPrice[2],
      mockProductsWithPrice[0]
    ]);
  });

  it('should return desc sorted products by price', () => {
    expect(service['sorting']('desc', deepClone(mockProductsWithPrice), 'price')).toEqual([
      mockProductsWithPrice[0],
      mockProductsWithPrice[2],
      mockProductsWithPrice[1]
    ]);
  });

  it('should return asc sorted products by price with discount', () => {
    expect(service['sorting']('asc', deepClone(mockProductsWithPriceDiscount), 'price')).toEqual([
      mockProductsWithPriceDiscount[1],
      mockProductsWithPriceDiscount[0],
      mockProductsWithPriceDiscount[2]
    ]);
  });

  it('should return desc sorted products by price with discount', () => {
    expect(service['sorting']('desc', deepClone(mockProductsWithPriceDiscount), 'price')).toEqual([
      mockProductsWithPriceDiscount[2],
      mockProductsWithPriceDiscount[0],
      mockProductsWithPriceDiscount[1]
    ]);
  });

  it('should return asc sorted products by rating', () => {
    expect(service['sorting']('asc', deepClone(mockProductsWithRating), 'rating')).toEqual([
      mockProductsWithRating[1],
      mockProductsWithRating[2],
      mockProductsWithRating[0]
    ]);
  });

  it('should return desc sorted products by rating', () => {
    expect(service['sorting']('desc', deepClone(mockProductsWithRating), 'rating')).toEqual([
      mockProductsWithRating[0],
      mockProductsWithRating[2],
      mockProductsWithRating[1]
    ]);
  });

  it('should return asc sorted products by rating without rating', () => {
    expect(service['sorting']('asc', deepClone(mockProductsWithoutRating), 'rating')).toEqual([
      mockProductsWithoutRating[0],
      mockProductsWithoutRating[1],
      mockProductsWithoutRating[2]
    ]);
  });

  it('should return desc sorted products by rating without rating', () => {
    expect(service['sorting']('desc', deepClone(mockProductsWithoutRating), 'rating')).toEqual([
      mockProductsWithoutRating[2],
      mockProductsWithoutRating[0],
      mockProductsWithoutRating[1]
    ]);
  });

  it('should return new asc sorted products by price', () => {
    expect(service.sortedProducts(mockProductsWithPrice, 'asc', 'price')).toEqual([
      mockProductsWithPrice[1],
      mockProductsWithPrice[2],
      mockProductsWithPrice[0]
    ]);
  });

  it('should return new desc sorted products by price', () => {
    expect(service.sortedProducts(mockProductsWithPrice, 'desc', 'price')).toEqual([
      mockProductsWithPrice[0],
      mockProductsWithPrice[2],
      mockProductsWithPrice[1]
    ]);
  });

  it('should return new asc sorted products by rating', () => {
    expect(service.sortedProducts(mockProductsWithRating, 'asc', 'rating')).toEqual([
      mockProductsWithRating[1],
      mockProductsWithRating[2],
      mockProductsWithRating[0]
    ]);
  });

  it('should return new desc sorted products by rating', () => {
    expect(service.sortedProducts(mockProductsWithRating, 'desc', 'rating')).toEqual([
      mockProductsWithRating[0],
      mockProductsWithRating[2],
      mockProductsWithRating[1]
    ]);
  });

  it('should return unsorted products if not pass sort', () => {
    expect(service.sortedProducts(mockProductsWithRating, 'desc', null)).toEqual([
      mockProductsWithRating[0],
      mockProductsWithRating[1],
      mockProductsWithRating[2]
    ]);
  });

  it('should return unsorted products if not pass target sort', () => {
    expect(service.sortedProducts(mockProductsWithRating, null, 'rating')).toEqual([
      mockProductsWithRating[0],
      mockProductsWithRating[1],
      mockProductsWithRating[2]
    ]);
  });
});
