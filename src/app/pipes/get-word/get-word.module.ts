import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GetWordPipe } from './get-word.pipe';

@NgModule({
  declarations: [GetWordPipe],
  imports: [CommonModule],
  exports: [GetWordPipe],
})
export class GetWordModule {}
