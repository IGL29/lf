import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { IProduct } from '~types/product';
import { ProductContainerService } from '../services/product-container/product-container.service';

export const productResolver: ResolveFn<IProduct['id']> = (route: ActivatedRouteSnapshot) => {
  const productContainerService = inject(ProductContainerService);
  const productId = Number(route.paramMap.get('id'));

  productContainerService.requestProduct(productId);

  return of(productId);
};
