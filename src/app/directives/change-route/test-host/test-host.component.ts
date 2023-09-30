import { Component } from '@angular/core';
import { ChangeRouteModule } from '../change-route.module';

@Component({
  template: '<div appChangeRoute data-test="host"></div>',
  standalone: true,
  imports: [ChangeRouteModule]
})
export class TestHostComponent {}
