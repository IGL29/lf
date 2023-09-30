import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormContainerComponent } from './search-form-container.component';
import { SearchFormModule } from 'src/app/components/search-form/search-form.module';

@NgModule({
  declarations: [SearchFormContainerComponent],
  imports: [CommonModule, SearchFormModule],
  exports: [SearchFormContainerComponent],
})
export class SearchFormContainerModule {}
