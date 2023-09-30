import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '~types/product';

@Pipe({
  name: 'productBadgeColor'
})
export class ProductBadgeColorPipe implements PipeTransform {
  transform(product: Pick<IProduct, 'price' | 'isNew'>): 'pink' | 'green' | null {
    return product?.isNew ? 'pink' : product.price.discount ? 'green' : null;
  }
}
