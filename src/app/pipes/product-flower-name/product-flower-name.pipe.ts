import { Pipe, PipeTransform } from '@angular/core';
import { EnumFlower, FLOWER_NAME, Flower, FlowerName } from '~types/product';

@Pipe({
  name: 'productFlowerName'
})
export class ProductFlowerNamePipe implements PipeTransform {
  transform(value: string): FlowerName {
    return FLOWER_NAME[EnumFlower[<Flower>value]] ?? value;
  }
}
