import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormatNamePipe } from './product-format-name.pipe';

@NgModule({
  declarations: [ProductFormatNamePipe],
  imports: [CommonModule],
  exports: [ProductFormatNamePipe]
})
export class ProductFormatNameModule {}
