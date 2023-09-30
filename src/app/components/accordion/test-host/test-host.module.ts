import { NgModule } from '@angular/core';
import { TestHostComponent } from './test-host.component';
import { AccordionModule } from '../accordion.module';

@NgModule({
  declarations: [TestHostComponent],
  imports: [AccordionModule],
  exports: [TestHostComponent]
})
export class AccordionTestModule {}
