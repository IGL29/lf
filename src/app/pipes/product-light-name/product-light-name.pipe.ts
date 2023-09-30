import { Pipe, PipeTransform } from '@angular/core';
import { EnumLight, LIGHT_NAME, Light, LightName } from '~types/product';

@Pipe({
  name: 'productLightName'
})
export class ProductLightNamePipe implements PipeTransform {
  transform(value: string): LightName {
    return LIGHT_NAME[EnumLight[<Light>value]] ?? value;
  }
}
