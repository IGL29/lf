import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogContainerComponent } from './catalog-container.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogContainerComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogContainerRoutingModule {}
