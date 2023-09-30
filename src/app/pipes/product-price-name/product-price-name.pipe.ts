import { Pipe, PipeTransform } from '@angular/core';
import { EnumPrice, PRICE_NAME, Price, PriceName } from '~types/product';

@Pipe({
  name: 'productPriceName'
})
export class ProductPriceNamePipe implements PipeTransform {
  transform(value: string): PriceName {
    return PRICE_NAME[EnumPrice[<Price>value]] ?? value;
  }
}
