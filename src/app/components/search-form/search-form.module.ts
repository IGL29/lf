import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './search-form.component';
import { IconModule } from '../icon/icon.module';
import { FormsModule } from '@angular/forms';
import { EmptyModule } from 'src/app/directives/validators/empty.module';

@NgModule({
  declarations: [SearchFormComponent],
  imports: [CommonModule, IconModule, FormsModule, EmptyModule],
  exports: [SearchFormComponent],
})
export class SearchFormModule {}
