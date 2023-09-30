import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderSuccessfulComponent } from './order-successful.component';

const routes: Routes = [
  {
    path: '',
    component: OrderSuccessfulComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentSuccessfulRoutingModule {}
