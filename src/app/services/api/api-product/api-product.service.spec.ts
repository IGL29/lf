import { TestBed } from '@angular/core/testing';

import { ApiProductService } from './api-product.service';
import { of } from 'rxjs';
import { getMockProduct } from '__tests__/mocks/data/product';
import { mockHttpService } from '__tests__/mocks/services/httpService';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../http/http.service';

describe('ApiProductService', () => {
  let service: ApiProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: mockHttpService
        }
      ]
    });
    service = TestBed.inject(ApiProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    const products = of([getMockProduct(), getMockProduct()]);

    it('should return stream with products', () => {
      mockHttpService.get.and.returnValue(products);
      expect(service.getProducts()).toEqual(products);
    });

    it('should call http.post with correctly args', () => {
      service.getProducts();
      expect(mockHttpService.get).toHaveBeenCalledWith(`${environment.api}/products`);
    });
  });

  describe('getProduct', () => {
    const prodcutId = 3;
    const product = of(getMockProduct({ id: prodcutId }));

    it('should return stream response', () => {
      mockHttpService.get.and.returnValue(product);
      expect(service.getProduct(prodcutId)).toEqual(product);
    });

    it('should call http.post with correctly args', () => {
      service.getProduct(prodcutId);
      expect(mockHttpService.get).toHaveBeenCalledWith(`${environment.api}/product/${prodcutId}`);
    });
  });
});
