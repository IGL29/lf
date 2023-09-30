import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchingResultsContainerComponent } from './searching-results-container.component';

const routes: Routes = [
  {
    path: '',
    component: SearchingResultsContainerComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchingResultRoutingModule {}
