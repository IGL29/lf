import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogContainerComponent } from './catalog-container.component';
import { CatalogContainerRoutingModule } from './catalog-container.routing.module';
import { CatalogModule } from './component/catalog.module';

@NgModule({
  declarations: [CatalogContainerComponent],
  imports: [CommonModule, CatalogContainerRoutingModule, CatalogModule],
  exports: [CatalogContainerComponent]
})
export class CatalogContainerModule {}
