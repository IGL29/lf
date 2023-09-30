import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeRouteDirective } from './change-route.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChangeRouteDirective],
  imports: [CommonModule, RouterModule],
  exports: [ChangeRouteDirective]
})
export class ChangeRouteModule {}
