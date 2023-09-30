import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadStatusDirective } from './image-upload-status.directive';

@NgModule({
  declarations: [ImageUploadStatusDirective],
  imports: [CommonModule],
  exports: [ImageUploadStatusDirective]
})
export class ImageUploadStatusModule {}
