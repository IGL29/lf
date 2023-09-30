import { Pipe, PipeTransform } from '@angular/core';
import {
  EnumProductFeature,
  PRODUCT_FEATURE_NAME,
  ProductFeature,
  ProductFeatureName
} from '~types/product';

@Pipe({
  name: 'productFeatures'
})
export class ProductFeaturesPipe implements PipeTransform {
  transform(value: string): ProductFeatureName {
    return PRODUCT_FEATURE_NAME[EnumProductFeature[<ProductFeature>value]] ?? value;
  }
}
