import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPrice } from './types';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceComponent {
  protected currentPrice: number;
  protected oldPrice: number;

  @Input() set price(productPrice: IPrice) {
    if (!productPrice) {
      return;
    }
    if (productPrice?.discount) {
      this.currentPrice = productPrice.value - productPrice.discount;
      this.oldPrice = productPrice.value;
      return;
    }
    this.currentPrice = productPrice.value;
    this.oldPrice = 0;
  }
}
