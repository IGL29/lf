import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainerComponent } from './main-container.component';
import { MainContainerRoutingModule } from './main-container.routing.module';
import { MainModule } from './component/main.module';

@NgModule({
  declarations: [MainContainerComponent],
  imports: [CommonModule, MainContainerRoutingModule, MainModule],
  exports: [MainContainerComponent],
})
export class MainContainerModule {}
