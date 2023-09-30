import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { productCard } from './data';
import { ProductCardData } from './types';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  public data = productCard;

  @Input() product: ProductCardData;
}
