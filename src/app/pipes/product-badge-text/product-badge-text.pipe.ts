import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '~types/product';

@Pipe({
  name: 'productBadgeText'
})
export class ProductBadgeTextPipe implements PipeTransform {
  transform(product: Pick<IProduct, 'price' | 'isNew'>): 'new' | 'sale' | '' {
    return product?.isNew ? 'new' : product.price.discount ? 'sale' : '';
  }
}
