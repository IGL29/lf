import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORY_NAME, Categories, EnumCategories } from '~types/product';

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {
  transform(category: Categories) {
    return CATEGORY_NAME[EnumCategories[category]];
  }
}
