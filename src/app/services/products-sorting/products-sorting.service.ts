import { Injectable } from '@angular/core';
import { IProduct } from '~types/product';
import { Sort } from '~components/sorting/types';
import { TargetSort } from 'src/app/containers/sorting-container/types';

@Injectable({
  providedIn: 'root'
})
export class ProductsSortingService {
  public sortedProducts(
    products: Array<IProduct>,
    sort: Sort | null,
    sortTarget: TargetSort | null
  ) {
    if (!sort || !sortTarget) {
      return products;
    }
    const cloneProducts = [...products];
    this.sorting(sort, cloneProducts, sortTarget);

    return cloneProducts;
  }

  private sorting(sort: Sort, products: IProduct[], sortTarget: TargetSort): IProduct[] {
    return products.sort((a: IProduct, b: IProduct) => {
      if (sortTarget === 'price') {
        return sort === 'asc'
          ? a.price.value - a.price.discount - (b.price.value - b.price.discount)
          : b.price.value - b.price.discount - (a.price.value - a.price.discount);
      }
      if (sortTarget === 'rating') {
        return sort === 'asc'
          ? (a.rating ?? 0) - (b.rating ?? 0)
          : (b.rating ?? 0) - (a.rating ?? 0);
      }
      return 0;
    });
  }
}
