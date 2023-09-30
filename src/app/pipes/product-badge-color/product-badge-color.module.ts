import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBadgeColorPipe } from './product-badge-color.pipe';

@NgModule({
  declarations: [ProductBadgeColorPipe],
  imports: [CommonModule],
  exports: [ProductBadgeColorPipe]
})
export class ProductBadgeColorModule {}
