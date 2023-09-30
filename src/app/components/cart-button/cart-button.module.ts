import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from './cart-button.component';
import { IconModule } from '../icon/icon.module';
import { MaxNumberModule } from 'src/app/pipes/max-number/max-number.module';

@NgModule({
  declarations: [CartButtonComponent],
  imports: [CommonModule, IconModule, MaxNumberModule],
  exports: [CartButtonComponent],
})
export class CartButtonModule {}
