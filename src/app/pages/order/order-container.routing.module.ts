import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderContainerComponent } from './order-container.component';
import { orderResolver } from 'src/app/guards/order-success.guard';
import { pages } from 'src/app/CEO';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: pages.order.title,
        component: OrderContainerComponent
      },
      {
        path: 'successful/:id',
        title: pages.orderSuccess.title,
        loadChildren: () =>
          import('~pages/order-successful/order-successful.module').then(
            (m) => m.PaymentSuccessfulModule
          ),
        resolve: [orderResolver]
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderContainerRoutingModule {}
