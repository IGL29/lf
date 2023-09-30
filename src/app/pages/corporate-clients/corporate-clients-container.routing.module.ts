import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateClientsContainerComponent } from './corporate-clients-container.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateClientsContainerComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporateContainerRoutingModule {}
