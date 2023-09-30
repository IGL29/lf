import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateClientsContainerComponent } from './corporate-clients-container.component';
import { CorporateClientsModule } from './component/corporate-clients.module';
import { CorporateContainerRoutingModule } from './corporate-clients-container.routing.module';

@NgModule({
  declarations: [CorporateClientsContainerComponent],
  imports: [
    CommonModule,
    CorporateContainerRoutingModule,
    CorporateClientsModule,
  ],
  exports: [CorporateClientsContainerComponent],
})
export class CorporateClientsContainerModule {}
