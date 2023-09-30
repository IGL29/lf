import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPriceNamePipe } from './product-price-name.pipe';

@NgModule({
  declarations: [ProductPriceNamePipe],
  imports: [CommonModule],
  exports: [ProductPriceNamePipe]
})
export class ProductPriceNameModule {}
