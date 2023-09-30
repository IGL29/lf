import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListCardComponent } from './product-list-card.component';
import { LoaderModule } from '../loader/loader.module';
import { ErrorBlockModule } from '../error-block/error-block.module';

@NgModule({
  declarations: [ProductListCardComponent],
  imports: [CommonModule, LoaderModule, ErrorBlockModule],
  exports: [ProductListCardComponent]
})
export class ProductListCardModule {}
