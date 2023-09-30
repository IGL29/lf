import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFeaturesPipe } from './product-features.pipe';

@NgModule({
  declarations: [ProductFeaturesPipe],
  imports: [CommonModule],
  exports: [ProductFeaturesPipe]
})
export class ProductFeaturesModule {}
