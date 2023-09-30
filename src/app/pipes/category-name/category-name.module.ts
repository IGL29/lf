import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryNamePipe } from './category-name.pipe';

@NgModule({
  declarations: [CategoryNamePipe],
  imports: [CommonModule],
  exports: [CategoryNamePipe]
})
export class CategoryNameModule {}
