import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import { CounterModule } from '../counter/counter.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductItemComponent],
  imports: [CommonModule, CounterModule, RouterModule, NgOptimizedImage],
  exports: [ProductItemComponent]
})
export class ProductItemModule {}
