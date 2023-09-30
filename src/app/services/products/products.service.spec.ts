import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { StoreService } from '../store/store.service';
import { mockStoreService } from '__tests__/mocks/services/StoreService';
import { mockProduct } from '__tests__/mocks/data/product';
import { of } from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        {
          provide: StoreService,
          useValue: mockStoreService
        }
      ]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called StoreService.dispatchRequestProducts', () => {
    service.requestProducts();
    expect(mockStoreService.dispatchRequestProducts).toHaveBeenCalled();
  });

  it('should be called StoreService.dispatchRequestProduct with id', () => {
    const productId = 5;
    service.requestProduct(productId);
    expect(mockStoreService.dispatchRequestProduct).toHaveBeenCalledWith(productId);
  });

  it('should be return stream with products', (done) => {
    mockStoreService.getProducts.and.returnValue(of([mockProduct, mockProduct]));
    service.getProducts().subscribe((products) => {
      expect(products).toEqual([mockProduct, mockProduct]);
      done();
    });
  });

  it('should be return stream with state loading', (done) => {
    mockStoreService.productsIsLoading.and.returnValue(of(true));
    service.productsIsLoading().subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
      done();
    });
  });

  it('should be return stream with state error', (done) => {
    mockStoreService.productsError.and.returnValue(of(true));
    service.productsError().subscribe((isError) => {
      expect(isError).toBeTrue();
      done();
    });
  });

  it('should be return stream with product', (done) => {
    mockStoreService.getProduct.and.returnValue(of(mockProduct));
    service.getProduct().subscribe((product) => {
      expect(product).toEqual(mockProduct);
      done();
    });
  });

  it('should be return stream with state error', (done) => {
    mockStoreService.getProductError.and.returnValue(of(true));
    service.getProductError().subscribe((isError) => {
      expect(isError).toBeTrue();
      done();
    });
  });

  it('should be return stream with state loading', (done) => {
    mockStoreService.productIsLoading.and.returnValue(of(true));
    service.productIsLoading().subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
      done();
    });
  });
});
