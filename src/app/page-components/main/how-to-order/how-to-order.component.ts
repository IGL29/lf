import { ChangeDetectionStrategy, Component } from '@angular/core';
import { pageData } from '~pages/main/data/pageData';

@Component({
  selector: 'app-how-to-order-section',
  templateUrl: './how-to-order.component.html',
  styleUrls: ['./how-to-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowToOrderComponent {
  public data = pageData.howToOrder;
}
