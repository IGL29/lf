import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { productResolver } from './guards/product.guard';
import { pages } from './CEO';

const routerConfig: ExtraOptions = {
  anchorScrolling: 'enabled',
  initialNavigation: 'enabledBlocking'
};

const routes: Routes = [
  {
    path: '',
    title: pages.main.title,
    loadChildren: () =>
      import('./pages/main/main-container.module').then((m) => m.MainContainerModule)
  },
  {
    path: 'catalog',
    title: pages.catalog.title,
    loadChildren: () =>
      import('./pages/catalog/catalog-container.module').then((m) => m.CatalogContainerModule)
  },
  {
    path: 'product/:id',
    title: pages.product.title,
    loadChildren: () =>
      import('./pages/product/product-container.module').then((m) => m.ProductContainerModule),
    resolve: { product: productResolver }
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./pages/order/order-container.module').then((m) => m.OrderContainerModule)
  },
  {
    path: 'searching-results',
    title: pages.searching.title,
    loadChildren: () =>
      import('./pages/searching-results/searching-results-container.module').then(
        (m) => m.SearchingResultsContainerModule
      )
  },
  {
    path: 'faq',
    title: pages.faq.title,
    loadChildren: () => import('./pages/faq/faq.module').then((m) => m.FaqModule)
  },
  {
    path: 'delivery-payment',
    title: pages.deliveryPayment.title,
    loadChildren: () =>
      import('./pages/delivery-payment/delivery-payment.module').then(
        (m) => m.DeliveryPaymentModule
      )
  },
  {
    path: 'about-us',
    title: pages.aboutUs.title,
    loadChildren: () => import('./pages/about-us/about-us.module').then((m) => m.AboutUsModule)
  },
  {
    path: 'corporate-clients',
    title: pages.corporateClients.title,
    loadChildren: () =>
      import('./pages/corporate-clients/corporate-clients-container.module').then(
        (m) => m.CorporateClientsContainerModule
      )
  },
  {
    path: 'contacts',
    title: pages.catalog.title,
    loadChildren: () => import('./pages/contacts/contacts.module').then((m) => m.ContactsModule)
  },
  {
    path: '**',
    title: pages.notFound.title,
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
