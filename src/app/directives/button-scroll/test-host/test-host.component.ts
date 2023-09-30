import { Component } from '@angular/core';
import { ButtonScrollModule } from '../button-scroll.module';

@Component({
  template: '<button appButtonScroll data-test="host"></button>',
  standalone: true,
  imports: [ButtonScrollModule]
})
export class TestHostComponent {}
