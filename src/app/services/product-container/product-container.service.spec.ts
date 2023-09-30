import { TestBed } from '@angular/core/testing';

import { ProductContainerService } from './product-container.service';
import { ProductsService } from '../products/products.service';
import { mockProductsService } from '__tests__/mocks/services/ProductsService';
import { CartService } from '../cart/cart.service';
import { mockCartService } from '__tests__/mocks/services/CartService';
import { of } from 'rxjs';
import { ICartItem } from '../cart-storage/cart-storage.service';
import { getMockProduct } from '__tests__/mocks/data/product';

describe('ProductContainerService', () => {
  let service: ProductContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductContainerService,
        {
          provide: ProductsService,
          useValue: mockProductsService
        },
        {
          provide: CartService,
          useValue: mockCartService
        }
      ]
    });
    service = TestBed.inject(ProductContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called productService.requestProduct with id', () => {
    const id = 5;
    service.requestProduct(id);
    expect(mockProductsService.requestProduct).toHaveBeenCalledWith(id);
  });

  it('should be called productService.getProduct', () => {
    service.getProduct();
    expect(mockProductsService.getProduct).toHaveBeenCalled();
  });

  it('should be return state error', () => {
    mockProductsService.getProductError.and.returnValue(true);
    expect(service.getProductError()).toBeTrue();
  });

  it('should be return stream with boolean', (done) => {
    mockProductsService.productIsLoading.and.returnValue(of(true));
    service.productIsLoading().subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
      done();
    });
  });

  it('should be called cartService.addToCart with itemCart', () => {
    const itemCart: ICartItem = { count: 5, product: getMockProduct() };
    service.addToCart(itemCart);
    expect(mockCartService.addToCart).toHaveBeenCalledWith(itemCart);
  });
});
