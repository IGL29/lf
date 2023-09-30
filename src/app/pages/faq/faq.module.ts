import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQRoutingModule } from './faq.routing.module';
import { BreadcrumbsModule } from 'src/app/components/breadcrumbs/breadcrumbs.module';
import { FaqComponent } from './faq.component';
import { AccordionModule } from 'src/app/components/accordion/accordion.module';

@NgModule({
  declarations: [FaqComponent],
  imports: [CommonModule, FAQRoutingModule, BreadcrumbsModule, AccordionModule],
  exports: [FaqComponent],
})
export class FaqModule {}
