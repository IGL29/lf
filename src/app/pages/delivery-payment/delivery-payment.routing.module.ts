import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryPaymentComponent } from './delivery-payment.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryPaymentComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryPaymentRoutingModule {}
