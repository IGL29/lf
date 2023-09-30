import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { pageData } from '~pages/delivery-payment/data/pageData';
import { description } from './data/meta';

@Component({
  selector: 'app-delivery-payment',
  templateUrl: './delivery-payment.component.html',
  styleUrls: ['./delivery-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryPaymentComponent {
  public data = pageData;

  constructor(private meta: Meta) {
    this.setMeta();
  }

  private setMeta(): void {
    this.meta.addTag({
      name: 'description',
      content: description
    });
  }
}
