import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductColorNamePipe } from './product-color-name.pipe';

@NgModule({
  declarations: [ProductColorNamePipe],
  imports: [CommonModule],
  exports: [ProductColorNamePipe]
})
export class ProductColorNameModule {}
