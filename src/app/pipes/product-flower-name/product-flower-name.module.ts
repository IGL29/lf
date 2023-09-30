import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFlowerNamePipe } from './product-flower-name.pipe';

@NgModule({
  declarations: [ProductFlowerNamePipe],
  imports: [CommonModule],
  exports: [ProductFlowerNamePipe]
})
export class ProductFlowerNameModule {}
