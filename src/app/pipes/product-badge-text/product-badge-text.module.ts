import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBadgeTextPipe } from './product-badge-text.pipe';

@NgModule({
  declarations: [ProductBadgeTextPipe],
  imports: [CommonModule],
  exports: [ProductBadgeTextPipe]
})
export class ProductBadgeTextModule {}
