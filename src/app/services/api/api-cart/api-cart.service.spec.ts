import { TestBed } from '@angular/core/testing';

import { ApiCartService } from './api-cart.service';
import { CartStorageService } from '../../cart-storage/cart-storage.service';
import { getMockProduct } from '__tests__/mocks/data/product';
import { mockCartStorageService } from '__tests__/mocks/services/CartStorageService';
import { of } from 'rxjs';

describe('ApiCartService', () => {
  let service: ApiCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CartStorageService,
          useValue: mockCartStorageService
        }
      ]
    });
    service = TestBed.inject(ApiCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cart', (done) => {
    const cart = [{ count: 1, product: getMockProduct() }];
    mockCartStorageService.getProducts.and.returnValue(cart);
    service.getProducts().subscribe((fromStream) => {
      expect(fromStream).toEqual(cart);
      done();
    });
  });

  it('should return cart with adding product', (done) => {
    const addingProduct = { count: 2, product: getMockProduct({ id: 1 }) };
    const cart = [{ count: 1, product: getMockProduct() }, addingProduct];
    mockCartStorageService.addProduct.and.returnValue(cart);
    service.addProduct(addingProduct).subscribe((fromStream) => {
      expect(fromStream).toEqual(cart);
      done();
    });
  });

  it('should call cartStorageService.addProduct with cart item', () => {
    const addingProduct = { count: 2, product: getMockProduct({ id: 1 }) };
    service.addProduct(addingProduct);
    expect(mockCartStorageService.addProduct).toHaveBeenCalledWith(addingProduct);
  });

  it('should return cart without deleted product', (done) => {
    const productId = 1;
    const cart = [{ count: 1, product: getMockProduct({ id: 2 }) }];
    mockCartStorageService.deleteProduct.and.returnValue(cart);
    service.deleteProduct(productId).subscribe((fromStream) => {
      expect(fromStream).toEqual(cart);
      done();
    });
  });

  it('should call cartStorageService.deleteProduct with id', () => {
    const productId = 1;
    service.deleteProduct(productId);
    expect(mockCartStorageService.deleteProduct).toHaveBeenCalledWith(productId);
  });

  it('should return cart with changed product count', (done) => {
    const productId = 1;
    const cart = [{ count: 1, product: getMockProduct({ id: 2 }) }];
    mockCartStorageService.replaceProductCount.and.returnValue(cart);
    service.changeProductCount(productId, 5).subscribe((fromStream) => {
      expect(fromStream).toEqual(cart);
      done();
    });
  });

  it('should call cartStorageService.replaceProductCount with id and count', () => {
    const productId = 1;
    const productCount = 5;
    service.changeProductCount(productId, productCount);
    expect(mockCartStorageService.replaceProductCount).toHaveBeenCalledWith(
      productId,
      productCount
    );
  });

  it('should return empty cart', (done) => {
    mockCartStorageService.clearAll.and.returnValue([]);
    service.clearAll().subscribe((fromStream) => {
      expect(fromStream).toEqual([]);
      done();
    });
  });
});
