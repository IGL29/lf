import { TestBed } from '@angular/core/testing';

import { Cart, CartStorageService } from './cart-storage.service';
import { StorageService } from '../storage/storage.service';
import { mockStorageService } from '__tests__/mocks/services/storageService';
import { getMockProduct } from '__tests__/mocks/data/product';

const addingProduct = { count: 1, product: getMockProduct({ id: 3 }) };
const productWithZeroCount = { count: 0, product: getMockProduct({ id: 3 }) };
const mockCart: Cart = [{ count: 4, product: getMockProduct({ id: 2 }) }];

describe('CartStorageService', () => {
  let service: CartStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartStorageService,
        {
          provide: StorageService,
          useValue: mockStorageService
        }
      ]
    });
    service = TestBed.inject(CartStorageService);
  });

  beforeEach(() => {
    mockStorageService.setItem.calls.reset();
    mockStorageService.getItem.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cart if existing', () => {
    mockStorageService.getItem.and.returnValue(mockCart);
    expect(service.getProducts()).toEqual(mockCart);
  });

  it('should return empty array if cart not existing', () => {
    const mockCart = null;
    service['createCart'] = jasmine.createSpy().and.returnValue([]);
    mockStorageService.getItem.and.returnValue(mockCart);
    expect(service.getProducts()).toEqual([]);
  });

  it('should call addToExistingCart with cart and product if cart existing', () => {
    spyOn(service, 'getProducts').and.returnValue(mockCart);
    service['addToExistingCart'] = jasmine.createSpy();
    service.addProduct(addingProduct);
    expect(service['addToExistingCart']).toHaveBeenCalledWith(mockCart, addingProduct);
  });

  it('should call deleteFromStorage with cart and product.id if product count zero', () => {
    spyOn(service, 'getProducts').and.returnValue(mockCart);
    service['deleteFromStorage'] = jasmine.createSpy();
    service.addProduct(productWithZeroCount);
    expect(service['deleteFromStorage']).toHaveBeenCalledWith(
      mockCart,
      productWithZeroCount.product.id
    );
  });

  it('should call addToEmptyCart with cart and adding product if cart not existing', () => {
    const emptyCart: any[] = [];
    spyOn(service, 'getProducts').and.returnValue(emptyCart);
    service['addToEmptyCart'] = jasmine.createSpy();
    service.addProduct(addingProduct);
    expect(service['addToEmptyCart']).toHaveBeenCalledWith(emptyCart, addingProduct);
  });

  it('should return new cart with adding product', () => {
    const emptyCart: any[] = [];
    spyOn(service, 'getProducts').and.returnValue(emptyCart);
    service['addToEmptyCart'] = jasmine.createSpy().and.returnValue([addingProduct]);
    expect(service.addProduct(addingProduct)).toEqual([addingProduct]);
  });

  it('should return existing cart with adding product', () => {
    const existingCart = [{ count: 1, product: getMockProduct({ id: 2 }) }];
    spyOn(service, 'getProducts').and.returnValue(existingCart);
    service['addToExistingCart'] = jasmine
      .createSpy()
      .and.returnValue([...existingCart, addingProduct]);
    expect(service.addProduct(addingProduct)).toEqual([...existingCart, addingProduct]);
  });

  it('should return new cart if cart not existing', () => {
    spyOn(service, 'getProducts').and.returnValue([]);
    expect(service.replaceProductCount(3, 2)).toEqual([]);
  });

  it('should return cart with changed product count', () => {
    spyOn(service, 'getProducts').and.returnValue(mockCart);
    expect(service.replaceProductCount(2, 2)[0].count).toBe(2);
  });

  it('should return cart without changing if product not existing in cart', () => {
    spyOn(service, 'getProducts').and.returnValue(mockCart);
    expect(service.replaceProductCount(1, 2)).toEqual(mockCart);
  });

  it('should return cart without deleted product', () => {
    spyOn(service, 'getProducts').and.returnValue(mockCart);
    service['deleteFromStorage'] = jasmine.createSpy().and.returnValue([]);
    expect(service.deleteProduct(2)).toEqual([]);
  });

  it('should return empty cart if cart not existing', () => {
    spyOn(service, 'getProducts').and.returnValue([]);
    expect(service.deleteProduct(2)).toEqual([]);
  });

  it('should return empty', () => {
    mockStorageService['setItem'] = jasmine.createSpy().and.returnValue([]);
    expect(service.clearAll()).toEqual([]);
  });

  it('should call storageService.setItem', () => {
    mockStorageService['setItem'] = jasmine.createSpy().and.returnValue([]);
    service.clearAll();
    expect(mockStorageService['setItem']).toHaveBeenCalledWith(service['key'], []);
  });

  it('should return new cart item from data', () => {
    expect(service['createCartItem'](getMockProduct(), 5)).toEqual({
      product: getMockProduct(),
      count: 5
    });
  });

  it('should call storageService.setItem with correctly args', () => {
    service['createCart']();
    expect(mockStorageService.setItem).toHaveBeenCalledOnceWith(service['key'], []);
  });

  it('should return empty cart', () => {
    expect(service['createCart']()).toEqual([]);
  });

  it('should return new cart with product', () => {
    expect(service['addToEmptyCart']([], addingProduct)).toEqual([addingProduct]);
  });

  it('should call storageService.setItem with key and cart', () => {
    service['addToEmptyCart']([], addingProduct);
    expect(mockStorageService.setItem).toHaveBeenCalledWith(service['key'], [addingProduct]);
  });

  it('should return cart with product', () => {
    service['createCartItem'] = jasmine.createSpy().and.returnValue(addingProduct);
    expect(service['addToExistingCart']([], addingProduct)).toEqual([addingProduct]);
  });

  it('should return cart with product count changing', () => {
    service['createCartItem'] = jasmine.createSpy().and.returnValue(addingProduct);
    expect(service['addToExistingCart']([addingProduct], addingProduct)).toEqual([
      { ...addingProduct, count: 2 }
    ]);
  });

  it('should return cart without product', () => {
    service['createCartItem'] = jasmine.createSpy().and.returnValue(addingProduct);
    expect(
      service['deleteFromStorage'](
        [addingProduct, { count: 1, product: getMockProduct({ id: 5 }) }],
        5
      )
    ).toEqual([addingProduct]);
  });

  it('should return cart without changing if product not exist', () => {
    service['createCartItem'] = jasmine.createSpy().and.returnValue(addingProduct);
    expect(service['deleteFromStorage']([addingProduct], 6)).toEqual([addingProduct]);
  });
});
