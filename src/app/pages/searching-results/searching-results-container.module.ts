import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchingResultRoutingModule } from './searching-results-container.routing.module';
import { SearchingResultsContainerComponent } from './searching-results-container.component';
import { SearchingResultsModule } from './component/searching-results.module';

@NgModule({
  declarations: [SearchingResultsContainerComponent],
  imports: [CommonModule, SearchingResultRoutingModule, SearchingResultsModule],
  exports: [SearchingResultsContainerComponent],
})
export class SearchingResultsContainerModule {}
