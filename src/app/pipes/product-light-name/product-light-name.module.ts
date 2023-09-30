import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLightNamePipe } from './product-light-name.pipe';

@NgModule({
  declarations: [ProductLightNamePipe],
  imports: [CommonModule],
  exports: [ProductLightNamePipe]
})
export class ProductLightNameModule {}
