import { Component } from '@angular/core';
import { ImageUploadStatusModule } from '../image-upload-status.module';

@Component({
  template: '<img appImageUploadStatus data-test="host" />',
  standalone: true,
  imports: [ImageUploadStatusModule]
})
export class TestHostComponent {}
