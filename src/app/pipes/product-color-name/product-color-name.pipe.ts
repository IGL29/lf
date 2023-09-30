import { Pipe, PipeTransform } from '@angular/core';
import { COLOR_NAME, Color, ColorName, EnumColor } from '~types/product';

@Pipe({
  name: 'productColorName'
})
export class ProductColorNamePipe implements PipeTransform {
  transform(value: Color): ColorName {
    return COLOR_NAME[EnumColor[value]] ?? value;
  }
}
